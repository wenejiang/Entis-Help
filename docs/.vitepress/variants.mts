import fs from 'node:fs'

export type Product = 'max' | 'lng'
export type Version = 4 | 5

export type Target = {
  product: Product
  version: Version
  productName: string
  versionLabel: string
  base: string
  outDir: string
  cacheDir: string
  title: string
  description: string
}

export const PRODUCT_TAG_MAX = 'PublishForMax'
export const PRODUCT_TAG_LNG = 'PublishForLng'
export const VERSION_TAG_4 = 'Version4'
export const VERSION_TAG_5 = 'Version5'

export const KNOWN_TAGS = [
  PRODUCT_TAG_MAX,
  PRODUCT_TAG_LNG,
  VERSION_TAG_4,
  VERSION_TAG_5
]

const ORDER_TAG_PATTERN = /^Order(\d{2})$/

export function isOrderTag(tag: string): boolean {
  return ORDER_TAG_PATTERN.test(tag)
}

export function parseOrderTag(tags: string[]): number | undefined {
  let order: number | undefined
  for (const tag of tags) {
    const match = ORDER_TAG_PATTERN.exec(tag)
    if (!match) continue
    const value = Number(match[1])
    if (order === undefined || value < order) order = value
  }
  return order
}

export const TARGETS: Target[] = [
  {
    product: 'max',
    version: 4,
    productName: 'EntisMax',
    versionLabel: '4',
    base: '/entismax/v4/',
    outDir: '.vitepress/dist/entismax/v4',
    cacheDir: '.vitepress/cache/entismax-v4',
    title: 'EntisMax 4 帮助文档',
    description: 'EntisMax 4 产品帮助中心'
  },
  {
    product: 'max',
    version: 5,
    productName: 'EntisMax',
    versionLabel: '5',
    base: '/entismax/v5/',
    outDir: '.vitepress/dist/entismax/v5',
    cacheDir: '.vitepress/cache/entismax-v5',
    title: 'EntisMax 5 帮助文档',
    description: 'EntisMax 5 产品帮助中心'
  },
  {
    product: 'lng',
    version: 4,
    productName: 'EntisLNG',
    versionLabel: '4',
    base: '/entislng/v4/',
    outDir: '.vitepress/dist/entislng/v4',
    cacheDir: '.vitepress/cache/entislng-v4',
    title: 'EntisLNG 4 帮助文档',
    description: 'EntisLNG 4 产品帮助中心'
  },
  {
    product: 'lng',
    version: 5,
    productName: 'EntisLNG',
    versionLabel: '5',
    base: '/entislng/v5/',
    outDir: '.vitepress/dist/entislng/v5',
    cacheDir: '.vitepress/cache/entislng-v5',
    title: 'EntisLNG 5 帮助文档',
    description: 'EntisLNG 5 产品帮助中心'
  }
]

function normalizeProduct(value: string | undefined): Product {
  const normalized = (value ?? '').trim().toLowerCase()
  if (!normalized || normalized === 'max' || normalized === 'entismax') return 'max'
  if (normalized === 'lng' || normalized === 'entislng') return 'lng'
  throw new Error(
    `DOCS_PRODUCT 只支持 max/entismax 或 lng/entislng，当前值：${value}`
  )
}

function normalizeVersion(value: string | undefined): Version {
  const normalized = (value ?? '').trim().toLowerCase().replace(/^v/, '')
  if (!normalized || normalized === '5' || normalized === '5.0') return 5
  if (normalized === '4' || normalized === '4.0') return 4
  throw new Error(`DOCS_VERSION 只支持 4/4.0 或 5/5.0，当前值：${value}`)
}

export function resolveTarget(): Target {
  const product = normalizeProduct(process.env.DOCS_PRODUCT)
  const version = normalizeVersion(process.env.DOCS_VERSION)
  const target = TARGETS.find(
    (item) => item.product === product && item.version === version
  )
  if (!target) {
    throw new Error(`未找到构建目标：${product} v${version}`)
  }
  return target
}

function unquote(value: string): string {
  const trimmed = value.trim()
  if (trimmed.length >= 2) {
    const first = trimmed[0]
    const last = trimmed[trimmed.length - 1]
    if ((first === "'" && last === "'") || (first === '"' && last === '"')) {
      return trimmed.slice(1, -1).trim()
    }
  }
  return trimmed
}

function parseInlineTags(value: string): string[] {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '[]') return []

  const inner = trimmed.startsWith('[') && trimmed.endsWith(']')
    ? trimmed.slice(1, -1)
    : trimmed

  return inner
    .split(',')
    .map(unquote)
    .filter(Boolean)
}

export function parseFrontMatterTags(content: string): string[] {
  const text = content.replace(/^\uFEFF/, '')
  if (!text.startsWith('---')) return []

  const lines = text.split(/\r?\n/)
  let end = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i
      break
    }
  }
  if (end < 0) return []

  for (let i = 1; i < end; i++) {
    const line = lines[i]
    const match = /^tags\s*:\s*(.*)$/.exec(line)
    if (!match) continue

    const rest = match[1].trim()
    if (rest) return parseInlineTags(rest)

    const tags: string[] = []
    for (let j = i + 1; j < end; j++) {
      const item = /^\s*-\s+(.+?)\s*$/.exec(lines[j])
      if (!item) {
        if (lines[j].trim() === '') continue
        break
      }
      const tag = unquote(item[1])
      if (tag) tags.push(tag)
    }
    return tags
  }

  return []
}

export function readTags(filePath: string): string[] {
  try {
    return parseFrontMatterTags(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

export function isIncluded(tags: string[], target: Target): boolean {
  const hasMax = tags.includes(PRODUCT_TAG_MAX)
  const hasLng = tags.includes(PRODUCT_TAG_LNG)
  const productIncluded =
    !hasMax && !hasLng ? true : hasMax && hasLng ? true : hasMax
      ? target.product === 'max'
      : target.product === 'lng'

  const has4 = tags.includes(VERSION_TAG_4)
  const has5 = tags.includes(VERSION_TAG_5)
  const versionIncluded =
    !has4 && !has5 ? true : has4 && has5 ? true : has4
      ? target.version === 4
      : target.version === 5

  return productIncluded && versionIncluded
}

export function escapeGlobPattern(value: string): string {
  const special = '\\*?|()[]{}!'
  return value
    .split('')
    .map((char) => (special.includes(char) ? `\\${char}` : char))
    .join('')
}

export function parseVariantBlockConditions(
  raw: string,
  warn?: (message: string) => void
): string[] {
  const conditions: string[] = []
  for (const part of raw.split(',')) {
    const condition = unquote(part.trim())
    if (!condition) continue
    if (!KNOWN_TAGS.includes(condition)) {
      warn?.(`未知正文条件：${condition}`)
      continue
    }
    conditions.push(condition)
  }
  return conditions
}

export function isVariantBlockIncluded(
  conditions: string[],
  target: Target
): boolean {
  return isIncluded(conditions, target)
}

type VariantFrame = {
  include: boolean
}

export function registerVariantBlockFilter(
  md: any,
  target: Target,
  warn: (message: string) => void
): void {
  const warned = new Set<string>()
  const warnOnce = (message: string) => {
    if (warned.has(message)) return
    warned.add(message)
    warn(message)
  }

  md.core.ruler.before('block', 'variant-block-filter', (state: any) => {
    const file = state.env?.relativePath ?? 'unknown.md'
    const lines = String(state.src ?? '').split('\n')
    const output: string[] = []
    const stack: VariantFrame[] = []

    for (const line of lines) {
      const trimmed = line.trim()

      const htmlStart = /^<!--\s*variant\s*:\s*(.*?)\s*-->$/i.exec(trimmed)
      const textStart = /^\[VARIANT\s*:\s*(.*?)\s*\]$/i.exec(trimmed)
      const startMatch = htmlStart ?? textStart

      if (startMatch) {
        if (stack.length > 0) {
          warnOnce(`${file}: 检测到嵌套条件块，按就近配对处理`)
        }
        const conditions = parseVariantBlockConditions(startMatch[1] ?? '', (message) =>
          warnOnce(`${file}: ${message}`)
        )
        const parentInclude = stack.length === 0 ? true : stack[stack.length - 1].include
        stack.push({
          include: parentInclude && isVariantBlockIncluded(conditions, target)
        })
        continue
      }

      const isEnd =
        /^<!--\s*\/\s*variant\s*-->$/i.test(trimmed) ||
        /^\[\s*\/\s*VARIANT\s*\]$/i.test(trimmed)

      if (isEnd) {
        if (stack.length === 0) {
          warnOnce(`${file}: 发现孤立的条件块结束标记`)
          continue
        }
        stack.pop()
        continue
      }

      if (stack.length === 0 || stack[stack.length - 1].include) {
        output.push(line)
      }
    }

    if (stack.length > 0) {
      warnOnce(`${file}: 存在未闭合的条件块开始标记`)
    }

    state.src = output.join('\n')
  })
}

export function buildVariantSwitcherScript(target: Target): string {
  const data = JSON.stringify({
    currentBase: target.base,
    targets: TARGETS.map((item) => ({
      label: `${item.productName} ${item.versionLabel}`,
      base: item.base
    }))
  })

  return `
(function () {
  var DATA = ${data};
  function mount() {
    if (document.getElementById('variant-switcher')) return;
    var nav = document.querySelector('.VPNavBarMenu') || document.querySelector('.VPNavBar');
    if (!nav) return;

    var box = document.createElement('div');
    box.id = 'variant-switcher';
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.gap = '4px';
    box.style.marginLeft = '10px';

    var label = document.createElement('span');
    label.textContent = '版本';
    label.style.fontSize = '12px';
    label.style.color = 'var(--vp-c-text-2)';
    box.appendChild(label);

    var select = document.createElement('select');
    select.id = 'variant-target-select';
    select.style.height = '28px';
    select.style.padding = '0 6px';
    select.style.border = '1px solid var(--vp-c-divider)';
    select.style.borderRadius = '4px';
    select.style.background = 'var(--vp-c-bg-alt)';
    select.style.color = 'var(--vp-c-text-1)';
    select.style.fontSize = '12px';

    DATA.targets.forEach(function (item) {
      var option = document.createElement('option');
      option.value = item.base;
      option.textContent = item.label;
      if (item.base === DATA.currentBase) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', function () {
      window.location.href = select.value;
    });

    box.appendChild(select);
    nav.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
`
}
