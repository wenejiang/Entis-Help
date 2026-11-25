import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  KNOWN_TAGS,
  buildVariantSwitcherScript,
  escapeGlobPattern,
  isIncluded,
  isOrderTag,
  parseOrderTag,
  readTags,
  registerVariantBlockFilter,
  resolveTarget
} from './variants.mts'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.resolve(currentDir, '..')
const guideDir = path.join(docsDir, 'guide')
const idsFile = path.join(currentDir, 'ids.json')
const ID_START = 1000
const target = resolveTarget()

const sidebarResizerScript = `
(function () {
  var KEY = 'entismax:sidebar-width';
  var MIN = 220;
  var MAX = 640;
  var DEFAULT = 272;
  function readSaved() {
    try {
      var v = Number(localStorage.getItem(KEY));
      if (v >= MIN && v <= MAX) return v;
    } catch (e) {}
    return DEFAULT;
  }
  function currentWidth() {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vp-sidebar-width'));
    return isFinite(v) ? v : DEFAULT;
  }
  function start() {
    document.documentElement.style.setProperty('--vp-sidebar-width', readSaved() + 'px');
    var h = document.getElementById('sidebar-resize-handle');
    if (!h) {
      h = document.createElement('div');
      h.id = 'sidebar-resize-handle';
      h.className = 'sidebar-resize-handle';
      h.setAttribute('role', 'separator');
      h.setAttribute('aria-orientation', 'vertical');
      h.setAttribute('aria-label', '拖动调整侧栏宽度');
      h.title = '拖动调整宽度，双击恢复默认';
      document.body.appendChild(h);
    }
    var frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        var sidebar = document.querySelector('.VPSidebar');
        if (!sidebar || window.innerWidth < 960) { h.style.display = 'none'; return; }
        var rect = sidebar.getBoundingClientRect();
        var navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height')) || 64;
        h.style.display = 'block';
        h.style.left = (rect.right - 4) + 'px';
        h.style.top = navHeight + 'px';
      });
    }
    function setWidth(width) {
      var clamped = Math.min(MAX, Math.max(MIN, width));
      document.documentElement.style.setProperty('--vp-sidebar-width', clamped + 'px');
      update();
    }
    var startX = 0;
    var startWidth = 0;
    function onMove(e) { setWidth(startWidth + e.clientX - startX); }
    function onUp() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.classList.remove('sidebar-resizing');
      try { localStorage.setItem(KEY, String(currentWidth())); } catch (e) {}
      update();
    }
    h.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      startX = e.clientX;
      startWidth = currentWidth();
      document.body.classList.add('sidebar-resizing');
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    });
    h.addEventListener('dblclick', function () {
      setWidth(DEFAULT);
      try { localStorage.removeItem(KEY); } catch (e) {}
    });
    window.addEventListener('resize', update);
    window.addEventListener('popstate', update);
    document.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('a')) setTimeout(update, 120);
    });
    requestAnimationFrame(update);
    setTimeout(update, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
`

type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

function listMarkdownFiles(dir: string): string[] {
  const result: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...listMarkdownFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(path.relative(docsDir, full).split(path.sep).join('/'))
    }
  }
  return result.sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

const allMdFiles = listMarkdownFiles(guideDir)

let idMap: Record<string, number> = {}
if (fs.existsSync(idsFile)) {
  try {
    idMap = JSON.parse(fs.readFileSync(idsFile, 'utf-8'))
  } catch {
    idMap = {}
  }
}

let nextId = Math.max(ID_START, ...Object.values(idMap), 0) + 1
for (const file of allMdFiles) {
  if (!idMap[file]) {
    idMap[file] = nextId++
  }
}
fs.writeFileSync(idsFile, JSON.stringify(idMap, null, 2) + '\n', 'utf-8')

const tagsByFile = new Map<string, string[]>()
const unknownTags = new Set<string>()
for (const file of allMdFiles) {
  const tags = readTags(path.join(docsDir, file))
  tagsByFile.set(file, tags)
  for (const tag of tags) {
    if (!KNOWN_TAGS.includes(tag) && !isOrderTag(tag)) unknownTags.add(tag)
  }
}

if (unknownTags.size > 0) {
  console.warn(
    `[variants] 当前目标 ${target.productName} ${target.versionLabel} 忽略未知标签：${[...unknownTags].join(', ')}`
  )
}

const includedFiles = allMdFiles.filter((file) =>
  isIncluded(tagsByFile.get(file) ?? [], target)
)
const includedSet = new Set(includedFiles)
const srcExclude = allMdFiles
  .filter((file) => !includedSet.has(file))
  .map(escapeGlobPattern)

const rewrites = (page: string): string => {
  if (!includedSet.has(page)) return page
  const id = idMap[page]
  return id ? `guide/${id}.md` : page
}

function numericLink(file: string): string | undefined {
  const id = idMap[file]
  return id ? `/guide/${id}.html` : undefined
}

function safeNumericLink(file: string): string | undefined {
  return includedSet.has(file) ? numericLink(file) : undefined
}

function buildSidebar(dir: string, relPrefix: string): SidebarItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const sortable: Array<{ order: number; name: string; item: SidebarItem }> = []
  const handled = new Set<string>()

  const orderOf = (relativeFile: string): number =>
    parseOrderTag(tagsByFile.get(relativeFile) ?? []) ?? Number.MAX_SAFE_INTEGER

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'assets') continue

    const folderName = entry.name
    const indexFileName = `${folderName}.md`
    const relativeIndexFile = `guide/${relPrefix}${indexFileName}`
    const hasIndexFile = entries.some(
      (item) => item.isFile() && item.name === indexFileName
    )
    const indexIncluded = hasIndexFile && includedSet.has(relativeIndexFile)
    const children = buildSidebar(
      path.join(dir, folderName),
      `${relPrefix}${folderName}/`
    )

    if (!indexIncluded && children.length === 0) continue
    if (indexIncluded) handled.add(indexFileName)

    sortable.push({
      order: orderOf(relativeIndexFile),
      name: folderName,
      item: {
        text: folderName,
        ...(indexIncluded ? { link: safeNumericLink(relativeIndexFile) } : {}),
        items: children,
        collapsed: false
      }
    })
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    if (handled.has(entry.name)) continue

    const relativeFile = `guide/${relPrefix}${entry.name}`
    const link = safeNumericLink(relativeFile)
    if (!link) continue

    const name = entry.name.replace(/\.md$/, '')
    sortable.push({
      order: orderOf(relativeFile),
      name,
      item: { text: name, link }
    })
  }

  sortable.sort(
    (a, b) => a.order - b.order || a.name.localeCompare(b.name, 'zh-CN')
  )
  return sortable.map((entry) => entry.item)
}

const preferredMainDoc = 'guide/EntisMAXIV/EntisMaxIV帮助文档.md'
const mainDoc = includedSet.has(preferredMainDoc)
  ? preferredMainDoc
  : includedFiles[0] ?? ''
const guideSidebar = buildSidebar(guideDir, '')

export default defineConfig({
  base: target.base,
  outDir: target.outDir,
  cacheDir: target.cacheDir,
  srcExclude,
  title: target.title,
  description: target.description,
  lang: 'zh-CN',
  head: [
    ['script', {}, sidebarResizerScript],
    ['script', {}, buildVariantSwitcherScript(target)]
  ],
  appearance: 'dark',
  ignoreDeadLinks: true,
  rewrites,
  transformPageData(pageData: any) {
    const hero = pageData?.frontmatter?.hero
    if (hero) {
      hero.name = target.productName
      hero.text = `${target.versionLabel} 帮助中心`
      hero.tagline = '设备安装、系统配置、操作与维护一站式文档'

      const fallback = safeNumericLink(mainDoc) ?? '/guide/'
      const preferredInstallDoc =
        'guide/EntisMAXIV/EntisMaxIV帮助文档/安装卸载说明.md'
      const installLink = safeNumericLink(preferredInstallDoc) ?? fallback

      hero.actions = [
        { theme: 'brand', text: '进入文档', link: fallback },
        { theme: 'alt', text: '安装与配置', link: installLink }
      ]
    }

    return pageData
  },
  markdown: {
    config: (md) => {
      const variantWarnings = new Set<string>()
      const warnVariant = (message: string) => {
        if (variantWarnings.has(message)) return
        variantWarnings.add(message)
        console.warn(
          `[variants] ${target.productName} ${target.versionLabel}: ${message}`
        )
      }

      registerVariantBlockFilter(md, target, warnVariant)

      md.core.ruler.push('variant-numeric-permalinks', (state: any) => {
        const current = state.env?.relativePath as string | undefined
        if (!current) return

        for (let index = 0; index < state.tokens.length; index++) {
          const token = state.tokens[index]
          if (token.type !== 'link_open') continue

          const href = token.attrGet('href')
          if (!href || /^(https?:|mailto:|#)/i.test(href)) continue

          const hashIndex = href.indexOf('#')
          const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href
          const hash = hashIndex >= 0 ? href.slice(hashIndex) : ''
          if (!rawPath) continue

          let decoded: string
          try {
            decoded = decodeURIComponent(rawPath)
          } catch {
            decoded = rawPath
          }
          if (!decoded.endsWith('.md')) continue

          const clean = decoded.replace(/^\/+/, '')
          const resolved = decoded.startsWith('/')
            ? path.posix.normalize(clean)
            : path.posix.normalize(path.posix.join(path.posix.dirname(current), clean))

          const numeric = numericLink(resolved)
          if (!numeric) continue

          if (!includedSet.has(resolved)) {
            token.type = 'text'
            token.tag = ''
            token.content = ''
            token.attrs = null
            token.meta = null
            token.nesting = 0

            let depth = 1
            for (let j = index + 1; j < state.tokens.length; j++) {
              const next = state.tokens[j]
              if (next.type === 'link_open') depth++
              if (next.type === 'link_close') {
                depth--
                if (depth === 0) {
                  next.type = 'text'
                  next.tag = ''
                  next.content = ''
                  next.attrs = null
                  next.meta = null
                  next.nesting = 0
                  break
                }
              }
            }
            continue
          }

          token.attrSet('href', numeric + hash)
        }
      })
    }
  },
  themeConfig: {
    nav: [
      { text: '帮助文档', link: safeNumericLink(mainDoc) ?? '/guide/' }
    ],
    sidebar: {
      '/guide/': guideSidebar
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询',
            backButtonTitle: '返回',
            noResultsText: '未找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '选择键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上',
              navigateDownKeyAriaLabel: '向下',
              closeText: '关闭',
              closeKeyAriaLabel: '关闭键'
            }
          }
        },
        miniSearch: {
          searchOptions: {
            boost: { title: 4, titles: 3, text: 2 },
            prefix: true,
            fuzzy: 0.2
          }
        }
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: [2, 3]
    }
  }
})
