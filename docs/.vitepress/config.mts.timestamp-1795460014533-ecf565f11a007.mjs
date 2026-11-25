// docs/.vitepress/config.mts
import { defineConfig } from "file:///E:/Project.EntisMAXSystem.Codes/HelpDoc/node_modules/vitepress/dist/node/index.js";
import fs2 from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// docs/.vitepress/variants.mts
import fs from "node:fs";
var PRODUCT_TAG_MAX = "PublishForMax";
var PRODUCT_TAG_LNG = "PublishForLng";
var VERSION_TAG_4 = "Version4";
var VERSION_TAG_5 = "Version5";
var KNOWN_TAGS = [
  PRODUCT_TAG_MAX,
  PRODUCT_TAG_LNG,
  VERSION_TAG_4,
  VERSION_TAG_5
];
var TARGETS = [
  {
    product: "max",
    version: 4,
    productName: "EntisMax",
    versionLabel: "4.0",
    base: "/entismax/v4/",
    outDir: ".vitepress/dist/entismax/v4",
    cacheDir: ".vitepress/cache/entismax-v4",
    title: "EntisMax 4.0 \u5E2E\u52A9\u6587\u6863",
    description: "EntisMax 4.0 \u4EA7\u54C1\u5E2E\u52A9\u4E2D\u5FC3"
  },
  {
    product: "max",
    version: 5,
    productName: "EntisMax",
    versionLabel: "5.0",
    base: "/entismax/v5/",
    outDir: ".vitepress/dist/entismax/v5",
    cacheDir: ".vitepress/cache/entismax-v5",
    title: "EntisMax 5.0 \u5E2E\u52A9\u6587\u6863",
    description: "EntisMax 5.0 \u4EA7\u54C1\u5E2E\u52A9\u4E2D\u5FC3"
  },
  {
    product: "lng",
    version: 4,
    productName: "EntisLNG",
    versionLabel: "4.0",
    base: "/entislng/v4/",
    outDir: ".vitepress/dist/entislng/v4",
    cacheDir: ".vitepress/cache/entislng-v4",
    title: "EntisLNG 4.0 \u5E2E\u52A9\u6587\u6863",
    description: "EntisLNG 4.0 \u4EA7\u54C1\u5E2E\u52A9\u4E2D\u5FC3"
  },
  {
    product: "lng",
    version: 5,
    productName: "EntisLNG",
    versionLabel: "5.0",
    base: "/entislng/v5/",
    outDir: ".vitepress/dist/entislng/v5",
    cacheDir: ".vitepress/cache/entislng-v5",
    title: "EntisLNG 5.0 \u5E2E\u52A9\u6587\u6863",
    description: "EntisLNG 5.0 \u4EA7\u54C1\u5E2E\u52A9\u4E2D\u5FC3"
  }
];
function normalizeProduct(value) {
  const normalized = (value ?? "").trim().toLowerCase();
  if (!normalized || normalized === "max" || normalized === "entismax") return "max";
  if (normalized === "lng" || normalized === "entislng") return "lng";
  throw new Error(
    `DOCS_PRODUCT \u53EA\u652F\u6301 max/entismax \u6216 lng/entislng\uFF0C\u5F53\u524D\u503C\uFF1A${value}`
  );
}
function normalizeVersion(value) {
  const normalized = (value ?? "").trim().toLowerCase().replace(/^v/, "");
  if (!normalized || normalized === "5" || normalized === "5.0") return 5;
  if (normalized === "4" || normalized === "4.0") return 4;
  throw new Error(`DOCS_VERSION \u53EA\u652F\u6301 4/4.0 \u6216 5/5.0\uFF0C\u5F53\u524D\u503C\uFF1A${value}`);
}
function resolveTarget() {
  const product = normalizeProduct(process.env.DOCS_PRODUCT);
  const version = normalizeVersion(process.env.DOCS_VERSION);
  const target2 = TARGETS.find(
    (item) => item.product === product && item.version === version
  );
  if (!target2) {
    throw new Error(`\u672A\u627E\u5230\u6784\u5EFA\u76EE\u6807\uFF1A${product} v${version}`);
  }
  if (process.env.DOCS_BASE === "/") {
    return { ...target2, base: "/" };
  }
  return target2;
}
function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    const first = trimmed[0];
    const last = trimmed[trimmed.length - 1];
    if (first === "'" && last === "'" || first === '"' && last === '"') {
      return trimmed.slice(1, -1).trim();
    }
  }
  return trimmed;
}
function parseInlineTags(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "[]") return [];
  const inner = trimmed.startsWith("[") && trimmed.endsWith("]") ? trimmed.slice(1, -1) : trimmed;
  return inner.split(",").map(unquote).filter(Boolean);
}
function parseFrontMatterTags(content) {
  const text = content.replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) return [];
  const lines = text.split(/\r?\n/);
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }
  if (end < 0) return [];
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const match = /^tags\s*:\s*(.*)$/.exec(line);
    if (!match) continue;
    const rest = match[1].trim();
    if (rest) return parseInlineTags(rest);
    const tags = [];
    for (let j = i + 1; j < end; j++) {
      const item = /^\s*-\s+(.+?)\s*$/.exec(lines[j]);
      if (!item) {
        if (lines[j].trim() === "") continue;
        break;
      }
      const tag = unquote(item[1]);
      if (tag) tags.push(tag);
    }
    return tags;
  }
  return [];
}
function readTags(filePath) {
  try {
    return parseFrontMatterTags(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}
function isIncluded(tags, target2) {
  const hasMax = tags.includes(PRODUCT_TAG_MAX);
  const hasLng = tags.includes(PRODUCT_TAG_LNG);
  const productIncluded = !hasMax && !hasLng ? true : hasMax && hasLng ? true : hasMax ? target2.product === "max" : target2.product === "lng";
  const has4 = tags.includes(VERSION_TAG_4);
  const has5 = tags.includes(VERSION_TAG_5);
  const versionIncluded = !has4 && !has5 ? true : has4 && has5 ? true : has4 ? target2.version === 4 : target2.version === 5;
  return productIncluded && versionIncluded;
}
function escapeGlobPattern(value) {
  const special = "\\*?|()[]{}!";
  return value.split("").map((char) => special.includes(char) ? `\\${char}` : char).join("");
}
function parseVariantBlockConditions(raw, warn) {
  const conditions = [];
  for (const part of raw.split(",")) {
    const condition = unquote(part.trim());
    if (!condition) continue;
    if (!KNOWN_TAGS.includes(condition)) {
      warn?.(`\u672A\u77E5\u6B63\u6587\u6761\u4EF6\uFF1A${condition}`);
      continue;
    }
    conditions.push(condition);
  }
  return conditions;
}
function isVariantBlockIncluded(conditions, target2) {
  return isIncluded(conditions, target2);
}
function registerVariantBlockFilter(md, target2, warn) {
  const warned = /* @__PURE__ */ new Set();
  const warnOnce = (message) => {
    if (warned.has(message)) return;
    warned.add(message);
    warn(message);
  };
  md.core.ruler.before("block", "variant-block-filter", (state) => {
    const file = state.env?.relativePath ?? "unknown.md";
    const lines = String(state.src ?? "").split("\n");
    const output = [];
    const stack = [];
    for (const line of lines) {
      const trimmed = line.trim();
      const htmlStart = /^<!--\s*variant\s*:\s*(.*?)\s*-->$/i.exec(trimmed);
      const textStart = /^\[VARIANT\s*:\s*(.*?)\s*\]$/i.exec(trimmed);
      const startMatch = htmlStart ?? textStart;
      if (startMatch) {
        if (stack.length > 0) {
          warnOnce(`${file}: \u68C0\u6D4B\u5230\u5D4C\u5957\u6761\u4EF6\u5757\uFF0C\u6309\u5C31\u8FD1\u914D\u5BF9\u5904\u7406`);
        }
        const conditions = parseVariantBlockConditions(
          startMatch[1] ?? "",
          (message) => warnOnce(`${file}: ${message}`)
        );
        const parentInclude = stack.length === 0 ? true : stack[stack.length - 1].include;
        stack.push({
          include: parentInclude && isVariantBlockIncluded(conditions, target2)
        });
        continue;
      }
      const isEnd = /^<!--\s*\/\s*variant\s*-->$/i.test(trimmed) || /^\[\s*\/\s*VARIANT\s*\]$/i.test(trimmed);
      if (isEnd) {
        if (stack.length === 0) {
          warnOnce(`${file}: \u53D1\u73B0\u5B64\u7ACB\u7684\u6761\u4EF6\u5757\u7ED3\u675F\u6807\u8BB0`);
          continue;
        }
        stack.pop();
        continue;
      }
      if (stack.length === 0 || stack[stack.length - 1].include) {
        output.push(line);
      }
    }
    if (stack.length > 0) {
      warnOnce(`${file}: \u5B58\u5728\u672A\u95ED\u5408\u7684\u6761\u4EF6\u5757\u5F00\u59CB\u6807\u8BB0`);
    }
    state.src = output.join("\n");
  });
}
function buildVariantSwitcherScript(target2) {
  const data = JSON.stringify({
    currentBase: target2.base,
    targets: TARGETS.map((item) => ({
      label: `${item.productName} ${item.versionLabel}`,
      base: item.base
    }))
  });
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
    label.textContent = '\u7248\u672C';
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
`;
}

// docs/.vitepress/config.mts
var __vite_injected_original_import_meta_url = "file:///E:/Project.EntisMAXSystem.Codes/HelpDoc/docs/.vitepress/config.mts";
var currentDir = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var docsDir = path.resolve(currentDir, "..");
var guideDir = path.join(docsDir, "guide");
var idsFile = path.join(currentDir, "ids.json");
var ID_START = 1e3;
var target = resolveTarget();
var isLocalDev = process.env.DOCS_BASE === "/";
var isDevPortal = isLocalDev && process.env.DOCS_DEV_PORTAL === "1";
var sidebarResizerScript = `
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
      h.setAttribute('aria-label', '\u62D6\u52A8\u8C03\u6574\u4FA7\u680F\u5BBD\u5EA6');
      h.title = '\u62D6\u52A8\u8C03\u6574\u5BBD\u5EA6\uFF0C\u53CC\u51FB\u6062\u590D\u9ED8\u8BA4';
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
`;
function listMarkdownFiles(dir) {
  const result = [];
  for (const entry of fs2.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "assets") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...listMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(path.relative(docsDir, full).split(path.sep).join("/"));
    }
  }
  return result.sort((a, b) => a.localeCompare(b, "zh-CN"));
}
var allMdFiles = listMarkdownFiles(guideDir);
var idMap = {};
if (fs2.existsSync(idsFile)) {
  try {
    idMap = JSON.parse(fs2.readFileSync(idsFile, "utf-8"));
  } catch {
    idMap = {};
  }
}
var nextId = Math.max(ID_START, ...Object.values(idMap), 0) + 1;
for (const file of allMdFiles) {
  if (!idMap[file]) {
    idMap[file] = nextId++;
  }
}
fs2.writeFileSync(idsFile, JSON.stringify(idMap, null, 2) + "\n", "utf-8");
var tagsByFile = /* @__PURE__ */ new Map();
var unknownTags = /* @__PURE__ */ new Set();
for (const file of allMdFiles) {
  const tags = readTags(path.join(docsDir, file));
  tagsByFile.set(file, tags);
  for (const tag of tags) {
    if (!KNOWN_TAGS.includes(tag)) unknownTags.add(tag);
  }
}
if (unknownTags.size > 0) {
  console.warn(
    `[variants] \u5F53\u524D\u76EE\u6807 ${target.productName} ${target.versionLabel} \u5FFD\u7565\u672A\u77E5\u6807\u7B7E\uFF1A${[...unknownTags].join(", ")}`
  );
}
var includedFiles = allMdFiles.filter(
  (file) => isIncluded(tagsByFile.get(file) ?? [], target)
);
var includedSet = new Set(includedFiles);
var srcExclude = allMdFiles.filter((file) => !includedSet.has(file)).map(escapeGlobPattern);
var rewrites = (page) => {
  if (!includedSet.has(page)) return page;
  const id = idMap[page];
  return id ? `guide/${id}.md` : page;
};
function numericLink(file) {
  const id = idMap[file];
  return id ? `/guide/${id}.html` : void 0;
}
function safeNumericLink(file) {
  return includedSet.has(file) ? numericLink(file) : void 0;
}
function buildSidebar(dir, relPrefix) {
  const items = [];
  const entries = fs2.readdirSync(dir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory() && entry.name !== "assets").sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  const handled = /* @__PURE__ */ new Set();
  for (const entry of dirs) {
    const folderName = entry.name;
    const children = buildSidebar(
      path.join(dir, folderName),
      relPrefix + folderName + "/"
    );
    const matchingFile = files.find((file) => {
      if (file.name !== folderName + ".md") return false;
      return includedSet.has("guide/" + relPrefix + file.name);
    });
    if (matchingFile) handled.add(matchingFile.name);
    if (!matchingFile && children.length === 0) continue;
    items.push({
      text: folderName,
      ...matchingFile ? { link: safeNumericLink("guide/" + relPrefix + matchingFile.name) } : {},
      items: children,
      collapsed: false
    });
  }
  for (const file of files) {
    if (handled.has(file.name)) continue;
    const relativeFile = "guide/" + relPrefix + file.name;
    const link = safeNumericLink(relativeFile);
    if (!link) continue;
    items.push({
      text: file.name.replace(/\.md$/, ""),
      link
    });
  }
  return items;
}
var preferredMainDoc = "guide/EntisMAXIV/EntisMaxIV\u5E2E\u52A9\u6587\u6863.md";
var mainDoc = includedSet.has(preferredMainDoc) ? preferredMainDoc : includedFiles[0] ?? "";
var guideSidebar = buildSidebar(guideDir, "");
var primaryDocLink = safeNumericLink(mainDoc) ?? "/guide/";
var devPortalFeatures = [
  {
    title: "EntisMax 4.0",
    details: "\u8FDB\u5165 EntisMax 4.x \u8BBE\u5907\u5B89\u88C5\u3001\u7CFB\u7EDF\u914D\u7F6E\u4E0E\u7EF4\u62A4\u6587\u6863\u3002",
    link: "http://localhost:5174/"
  },
  {
    title: "EntisMax 5.0",
    details: "\u8FDB\u5165 EntisMax 5.x \u8BBE\u5907\u5B89\u88C5\u3001\u7CFB\u7EDF\u914D\u7F6E\u4E0E\u7EF4\u62A4\u6587\u6863\u3002",
    link: `http://localhost:5175${primaryDocLink}`
  },
  {
    title: "EntisLNG 4.0",
    details: "\u8FDB\u5165 EntisLNG 4.x \u8BBE\u5907\u5B89\u88C5\u3001\u7CFB\u7EDF\u914D\u7F6E\u4E0E\u7EF4\u62A4\u6587\u6863\u3002",
    link: "http://localhost:5176/"
  },
  {
    title: "EntisLNG 5.0",
    details: "\u8FDB\u5165 EntisLNG 5.x \u8BBE\u5907\u5B89\u88C5\u3001\u7CFB\u7EDF\u914D\u7F6E\u4E0E\u7EF4\u62A4\u6587\u6863\u3002",
    link: "http://localhost:5177/"
  }
];
var config_default = defineConfig({
  base: target.base,
  outDir: target.outDir,
  cacheDir: target.cacheDir,
  srcExclude,
  title: target.title,
  description: target.description,
  lang: "zh-CN",
  head: [
    ["script", {}, sidebarResizerScript],
    ...process.env.DOCS_BASE === "/" ? [] : [["script", {}, buildVariantSwitcherScript(target)]]
  ],
  appearance: "dark",
  ignoreDeadLinks: true,
  rewrites,
  transformPageData(pageData) {
    const hero = pageData?.frontmatter?.hero;
    if (hero) {
      hero.name = target.productName;
      hero.text = `${target.versionLabel} \u5E2E\u52A9\u4E2D\u5FC3`;
      hero.tagline = "\u8BBE\u5907\u5B89\u88C5\u3001\u7CFB\u7EDF\u914D\u7F6E\u3001\u64CD\u4F5C\u4E0E\u7EF4\u62A4\u4E00\u7AD9\u5F0F\u6587\u6863";
      const fallback = safeNumericLink(mainDoc) ?? "/guide/";
      const preferredInstallDoc = "guide/EntisMAXIV/EntisMaxIV\u5E2E\u52A9\u6587\u6863/\u5B89\u88C5\u5378\u8F7D\u8BF4\u660E.md";
      const installLink = safeNumericLink(preferredInstallDoc) ?? fallback;
      hero.actions = [
        { theme: "brand", text: "\u8FDB\u5165\u6587\u6863", link: fallback },
        { theme: "alt", text: "\u5B89\u88C5\u4E0E\u914D\u7F6E", link: installLink }
      ];
    }
    return pageData;
  },
  markdown: {
    config: (md) => {
      const variantWarnings = /* @__PURE__ */ new Set();
      const warnVariant = (message) => {
        if (variantWarnings.has(message)) return;
        variantWarnings.add(message);
        console.warn(
          `[variants] ${target.productName} ${target.versionLabel}: ${message}`
        );
      };
      registerVariantBlockFilter(md, target, warnVariant);
      md.core.ruler.push("variant-numeric-permalinks", (state) => {
        const current = state.env?.relativePath;
        if (!current) return;
        for (let index = 0; index < state.tokens.length; index++) {
          const token = state.tokens[index];
          if (token.type !== "link_open") continue;
          const href = token.attrGet("href");
          if (!href || /^(https?:|mailto:|#)/i.test(href)) continue;
          const hashIndex = href.indexOf("#");
          const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
          const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
          if (!rawPath) continue;
          let decoded;
          try {
            decoded = decodeURIComponent(rawPath);
          } catch {
            decoded = rawPath;
          }
          if (!decoded.endsWith(".md")) continue;
          const clean = decoded.replace(/^\/+/, "");
          const resolved = decoded.startsWith("/") ? path.posix.normalize(clean) : path.posix.normalize(path.posix.join(path.posix.dirname(current), clean));
          const numeric = numericLink(resolved);
          if (!numeric) continue;
          if (!includedSet.has(resolved)) {
            token.type = "text";
            token.tag = "";
            token.content = "";
            token.attrs = null;
            token.meta = null;
            token.nesting = 0;
            let depth = 1;
            for (let j = index + 1; j < state.tokens.length; j++) {
              const next = state.tokens[j];
              if (next.type === "link_open") depth++;
              if (next.type === "link_close") {
                depth--;
                if (depth === 0) {
                  next.type = "text";
                  next.tag = "";
                  next.content = "";
                  next.attrs = null;
                  next.meta = null;
                  next.nesting = 0;
                  break;
                }
              }
            }
            continue;
          }
          token.attrSet("href", numeric + hash);
        }
      });
    }
  },
  themeConfig: {
    nav: [
      { text: "\u5E2E\u52A9\u6587\u6863", link: safeNumericLink(mainDoc) ?? "/guide/" }
    ],
    sidebar: {
      "/guide/": guideSidebar
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "\u641C\u7D22\u6587\u6863",
            buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
          },
          modal: {
            displayDetails: "\u663E\u793A\u8BE6\u60C5",
            resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2",
            backButtonTitle: "\u8FD4\u56DE",
            noResultsText: "\u672A\u627E\u5230\u7ED3\u679C",
            footer: {
              selectText: "\u9009\u62E9",
              selectKeyAriaLabel: "\u9009\u62E9\u952E",
              navigateText: "\u5207\u6362",
              navigateUpKeyAriaLabel: "\u5411\u4E0A",
              navigateDownKeyAriaLabel: "\u5411\u4E0B",
              closeText: "\u5173\u95ED",
              closeKeyAriaLabel: "\u5173\u95ED\u952E"
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
      prev: "\u4E0A\u4E00\u7BC7",
      next: "\u4E0B\u4E00\u7BC7"
    },
    outline: {
      level: [2, 3]
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL3ZhcmlhbnRzLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFByb2plY3QuRW50aXNNQVhTeXN0ZW0uQ29kZXNcXFxcSGVscERvY1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFByb2plY3QuRW50aXNNQVhTeXN0ZW0uQ29kZXNcXFxcSGVscERvY1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUHJvamVjdC5FbnRpc01BWFN5c3RlbS5Db2Rlcy9IZWxwRG9jL2RvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJ1xyXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7XHJcbiAgS05PV05fVEFHUyxcclxuICBidWlsZFZhcmlhbnRTd2l0Y2hlclNjcmlwdCxcclxuICBlc2NhcGVHbG9iUGF0dGVybixcclxuICBpc0luY2x1ZGVkLFxyXG4gIHJlYWRUYWdzLFxyXG4gIHJlZ2lzdGVyVmFyaWFudEJsb2NrRmlsdGVyLFxyXG4gIHJlc29sdmVUYXJnZXRcclxufSBmcm9tICcuL3ZhcmlhbnRzLm10cydcclxuXHJcbmNvbnN0IGN1cnJlbnREaXIgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKVxyXG5jb25zdCBkb2NzRGlyID0gcGF0aC5yZXNvbHZlKGN1cnJlbnREaXIsICcuLicpXHJcbmNvbnN0IGd1aWRlRGlyID0gcGF0aC5qb2luKGRvY3NEaXIsICdndWlkZScpXHJcbmNvbnN0IGlkc0ZpbGUgPSBwYXRoLmpvaW4oY3VycmVudERpciwgJ2lkcy5qc29uJylcclxuY29uc3QgSURfU1RBUlQgPSAxMDAwXHJcbmNvbnN0IHRhcmdldCA9IHJlc29sdmVUYXJnZXQoKVxyXG5jb25zdCBpc0xvY2FsRGV2ID0gcHJvY2Vzcy5lbnYuRE9DU19CQVNFID09PSAnLydcclxuY29uc3QgaXNEZXZQb3J0YWwgPSBpc0xvY2FsRGV2ICYmIHByb2Nlc3MuZW52LkRPQ1NfREVWX1BPUlRBTCA9PT0gJzEnXHJcblxyXG5jb25zdCBzaWRlYmFyUmVzaXplclNjcmlwdCA9IGBcclxuKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgS0VZID0gJ2VudGlzbWF4OnNpZGViYXItd2lkdGgnO1xyXG4gIHZhciBNSU4gPSAyMjA7XHJcbiAgdmFyIE1BWCA9IDY0MDtcclxuICB2YXIgREVGQVVMVCA9IDI3MjtcclxuICBmdW5jdGlvbiByZWFkU2F2ZWQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgdiA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShLRVkpKTtcclxuICAgICAgaWYgKHYgPj0gTUlOICYmIHYgPD0gTUFYKSByZXR1cm4gdjtcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICByZXR1cm4gREVGQVVMVDtcclxuICB9XHJcbiAgZnVuY3Rpb24gY3VycmVudFdpZHRoKCkge1xyXG4gICAgdmFyIHYgPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLXZwLXNpZGViYXItd2lkdGgnKSk7XHJcbiAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogREVGQVVMVDtcclxuICB9XHJcbiAgZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdnAtc2lkZWJhci13aWR0aCcsIHJlYWRTYXZlZCgpICsgJ3B4Jyk7XHJcbiAgICB2YXIgaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyLXJlc2l6ZS1oYW5kbGUnKTtcclxuICAgIGlmICghaCkge1xyXG4gICAgICBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGguaWQgPSAnc2lkZWJhci1yZXNpemUtaGFuZGxlJztcclxuICAgICAgaC5jbGFzc05hbWUgPSAnc2lkZWJhci1yZXNpemUtaGFuZGxlJztcclxuICAgICAgaC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnc2VwYXJhdG9yJyk7XHJcbiAgICAgIGguc2V0QXR0cmlidXRlKCdhcmlhLW9yaWVudGF0aW9uJywgJ3ZlcnRpY2FsJyk7XHJcbiAgICAgIGguc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1x1NjJENlx1NTJBOFx1OEMwM1x1NjU3NFx1NEZBN1x1NjgwRlx1NUJCRFx1NUVBNicpO1xyXG4gICAgICBoLnRpdGxlID0gJ1x1NjJENlx1NTJBOFx1OEMwM1x1NjU3NFx1NUJCRFx1NUVBNlx1RkYwQ1x1NTNDQ1x1NTFGQlx1NjA2Mlx1NTkwRFx1OUVEOFx1OEJBNCc7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaCk7XHJcbiAgICB9XHJcbiAgICB2YXIgZnJhbWUgPSAwO1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcbiAgICAgIGZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5WUFNpZGViYXInKTtcclxuICAgICAgICBpZiAoIXNpZGViYXIgfHwgd2luZG93LmlubmVyV2lkdGggPCA5NjApIHsgaC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyByZXR1cm47IH1cclxuICAgICAgICB2YXIgcmVjdCA9IHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgdmFyIG5hdkhlaWdodCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJy0tdnAtbmF2LWhlaWdodCcpKSB8fCA2NDtcclxuICAgICAgICBoLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGguc3R5bGUubGVmdCA9IChyZWN0LnJpZ2h0IC0gNCkgKyAncHgnO1xyXG4gICAgICAgIGguc3R5bGUudG9wID0gbmF2SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRXaWR0aCh3aWR0aCkge1xyXG4gICAgICB2YXIgY2xhbXBlZCA9IE1hdGgubWluKE1BWCwgTWF0aC5tYXgoTUlOLCB3aWR0aCkpO1xyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdnAtc2lkZWJhci13aWR0aCcsIGNsYW1wZWQgKyAncHgnKTtcclxuICAgICAgdXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RhcnRYID0gMDtcclxuICAgIHZhciBzdGFydFdpZHRoID0gMDtcclxuICAgIGZ1bmN0aW9uIG9uTW92ZShlKSB7IHNldFdpZHRoKHN0YXJ0V2lkdGggKyBlLmNsaWVudFggLSBzdGFydFgpOyB9XHJcbiAgICBmdW5jdGlvbiBvblVwKCkge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBvbk1vdmUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgb25VcCk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1yZXNpemluZycpO1xyXG4gICAgICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShLRVksIFN0cmluZyhjdXJyZW50V2lkdGgoKSkpOyB9IGNhdGNoIChlKSB7fVxyXG4gICAgICB1cGRhdGUoKTtcclxuICAgIH1cclxuICAgIGguYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBpZiAoZS5idXR0b24gIT09IDApIHJldHVybjtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzdGFydFggPSBlLmNsaWVudFg7XHJcbiAgICAgIHN0YXJ0V2lkdGggPSBjdXJyZW50V2lkdGgoKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXJlc2l6aW5nJyk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIG9uTW92ZSk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBvblVwKTtcclxuICAgIH0pO1xyXG4gICAgaC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0V2lkdGgoREVGQVVMVCk7XHJcbiAgICAgIHRyeSB7IGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEtFWSk7IH0gY2F0Y2ggKGUpIHt9XHJcbiAgICB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdXBkYXRlKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmNsb3Nlc3QgJiYgZS50YXJnZXQuY2xvc2VzdCgnYScpKSBzZXRUaW1lb3V0KHVwZGF0ZSwgMTIwKTtcclxuICAgIH0pO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZSwgMzAwKTtcclxuICB9XHJcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHN0YXJ0KTsgZWxzZSBzdGFydCgpO1xyXG59KSgpO1xyXG5gXHJcblxyXG50eXBlIFNpZGViYXJJdGVtID0ge1xyXG4gIHRleHQ6IHN0cmluZ1xyXG4gIGxpbms/OiBzdHJpbmdcclxuICBpdGVtcz86IFNpZGViYXJJdGVtW11cclxuICBjb2xsYXBzZWQ/OiBib29sZWFuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RNYXJrZG93bkZpbGVzKGRpcjogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IHJlc3VsdDogc3RyaW5nW10gPSBbXVxyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgZnMucmVhZGRpclN5bmMoZGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSkpIHtcclxuICAgIGlmIChlbnRyeS5uYW1lID09PSAnYXNzZXRzJykgY29udGludWVcclxuICAgIGNvbnN0IGZ1bGwgPSBwYXRoLmpvaW4oZGlyLCBlbnRyeS5uYW1lKVxyXG4gICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgcmVzdWx0LnB1c2goLi4ubGlzdE1hcmtkb3duRmlsZXMoZnVsbCkpXHJcbiAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRmlsZSgpICYmIGVudHJ5Lm5hbWUuZW5kc1dpdGgoJy5tZCcpKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKHBhdGgucmVsYXRpdmUoZG9jc0RpciwgZnVsbCkuc3BsaXQocGF0aC5zZXApLmpvaW4oJy8nKSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdC5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYiwgJ3poLUNOJykpXHJcbn1cclxuXHJcbmNvbnN0IGFsbE1kRmlsZXMgPSBsaXN0TWFya2Rvd25GaWxlcyhndWlkZURpcilcclxuXHJcbmxldCBpZE1hcDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9XHJcbmlmIChmcy5leGlzdHNTeW5jKGlkc0ZpbGUpKSB7XHJcbiAgdHJ5IHtcclxuICAgIGlkTWFwID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoaWRzRmlsZSwgJ3V0Zi04JykpXHJcbiAgfSBjYXRjaCB7XHJcbiAgICBpZE1hcCA9IHt9XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgbmV4dElkID0gTWF0aC5tYXgoSURfU1RBUlQsIC4uLk9iamVjdC52YWx1ZXMoaWRNYXApLCAwKSArIDFcclxuZm9yIChjb25zdCBmaWxlIG9mIGFsbE1kRmlsZXMpIHtcclxuICBpZiAoIWlkTWFwW2ZpbGVdKSB7XHJcbiAgICBpZE1hcFtmaWxlXSA9IG5leHRJZCsrXHJcbiAgfVxyXG59XHJcbmZzLndyaXRlRmlsZVN5bmMoaWRzRmlsZSwgSlNPTi5zdHJpbmdpZnkoaWRNYXAsIG51bGwsIDIpICsgJ1xcbicsICd1dGYtOCcpXHJcblxyXG5jb25zdCB0YWdzQnlGaWxlID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpXHJcbmNvbnN0IHVua25vd25UYWdzID0gbmV3IFNldDxzdHJpbmc+KClcclxuZm9yIChjb25zdCBmaWxlIG9mIGFsbE1kRmlsZXMpIHtcclxuICBjb25zdCB0YWdzID0gcmVhZFRhZ3MocGF0aC5qb2luKGRvY3NEaXIsIGZpbGUpKVxyXG4gIHRhZ3NCeUZpbGUuc2V0KGZpbGUsIHRhZ3MpXHJcbiAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xyXG4gICAgaWYgKCFLTk9XTl9UQUdTLmluY2x1ZGVzKHRhZykpIHVua25vd25UYWdzLmFkZCh0YWcpXHJcbiAgfVxyXG59XHJcblxyXG5pZiAodW5rbm93blRhZ3Muc2l6ZSA+IDApIHtcclxuICBjb25zb2xlLndhcm4oXHJcbiAgICBgW3ZhcmlhbnRzXSBcdTVGNTNcdTUyNERcdTc2RUVcdTY4MDcgJHt0YXJnZXQucHJvZHVjdE5hbWV9ICR7dGFyZ2V0LnZlcnNpb25MYWJlbH0gXHU1RkZEXHU3NTY1XHU2NzJBXHU3N0U1XHU2ODA3XHU3QjdFXHVGRjFBJHtbLi4udW5rbm93blRhZ3NdLmpvaW4oJywgJyl9YFxyXG4gIClcclxufVxyXG5cclxuY29uc3QgaW5jbHVkZWRGaWxlcyA9IGFsbE1kRmlsZXMuZmlsdGVyKChmaWxlKSA9PlxyXG4gIGlzSW5jbHVkZWQodGFnc0J5RmlsZS5nZXQoZmlsZSkgPz8gW10sIHRhcmdldClcclxuKVxyXG5jb25zdCBpbmNsdWRlZFNldCA9IG5ldyBTZXQoaW5jbHVkZWRGaWxlcylcclxuY29uc3Qgc3JjRXhjbHVkZSA9IGFsbE1kRmlsZXNcclxuICAuZmlsdGVyKChmaWxlKSA9PiAhaW5jbHVkZWRTZXQuaGFzKGZpbGUpKVxyXG4gIC5tYXAoZXNjYXBlR2xvYlBhdHRlcm4pXHJcblxyXG5jb25zdCByZXdyaXRlcyA9IChwYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghaW5jbHVkZWRTZXQuaGFzKHBhZ2UpKSByZXR1cm4gcGFnZVxyXG4gIGNvbnN0IGlkID0gaWRNYXBbcGFnZV1cclxuICByZXR1cm4gaWQgPyBgZ3VpZGUvJHtpZH0ubWRgIDogcGFnZVxyXG59XHJcblxyXG5mdW5jdGlvbiBudW1lcmljTGluayhmaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gIGNvbnN0IGlkID0gaWRNYXBbZmlsZV1cclxuICByZXR1cm4gaWQgPyBgL2d1aWRlLyR7aWR9Lmh0bWxgIDogdW5kZWZpbmVkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhZmVOdW1lcmljTGluayhmaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gIHJldHVybiBpbmNsdWRlZFNldC5oYXMoZmlsZSkgPyBudW1lcmljTGluayhmaWxlKSA6IHVuZGVmaW5lZFxyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFNpZGViYXIoZGlyOiBzdHJpbmcsIHJlbFByZWZpeDogc3RyaW5nKTogU2lkZWJhckl0ZW1bXSB7XHJcbiAgY29uc3QgaXRlbXM6IFNpZGViYXJJdGVtW10gPSBbXVxyXG4gIGNvbnN0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIsIHsgd2l0aEZpbGVUeXBlczogdHJ1ZSB9KVxyXG5cclxuICBjb25zdCBkaXJzID0gZW50cmllc1xyXG4gICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkgJiYgZW50cnkubmFtZSAhPT0gJ2Fzc2V0cycpXHJcbiAgICAuc29ydCgoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lLCAnemgtQ04nKSlcclxuXHJcbiAgY29uc3QgZmlsZXMgPSBlbnRyaWVzXHJcbiAgICAuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaXNGaWxlKCkgJiYgZW50cnkubmFtZS5lbmRzV2l0aCgnLm1kJykpXHJcbiAgICAuc29ydCgoYSwgYikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lLCAnemgtQ04nKSlcclxuXHJcbiAgY29uc3QgaGFuZGxlZCA9IG5ldyBTZXQ8c3RyaW5nPigpXHJcblxyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgZGlycykge1xyXG4gICAgY29uc3QgZm9sZGVyTmFtZSA9IGVudHJ5Lm5hbWVcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gYnVpbGRTaWRlYmFyKFxyXG4gICAgICBwYXRoLmpvaW4oZGlyLCBmb2xkZXJOYW1lKSxcclxuICAgICAgcmVsUHJlZml4ICsgZm9sZGVyTmFtZSArICcvJ1xyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IG1hdGNoaW5nRmlsZSA9IGZpbGVzLmZpbmQoKGZpbGUpID0+IHtcclxuICAgICAgaWYgKGZpbGUubmFtZSAhPT0gZm9sZGVyTmFtZSArICcubWQnKSByZXR1cm4gZmFsc2VcclxuICAgICAgcmV0dXJuIGluY2x1ZGVkU2V0LmhhcygnZ3VpZGUvJyArIHJlbFByZWZpeCArIGZpbGUubmFtZSlcclxuICAgIH0pXHJcblxyXG4gICAgaWYgKG1hdGNoaW5nRmlsZSkgaGFuZGxlZC5hZGQobWF0Y2hpbmdGaWxlLm5hbWUpXHJcbiAgICBpZiAoIW1hdGNoaW5nRmlsZSAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDApIGNvbnRpbnVlXHJcblxyXG4gICAgaXRlbXMucHVzaCh7XHJcbiAgICAgIHRleHQ6IGZvbGRlck5hbWUsXHJcbiAgICAgIC4uLihtYXRjaGluZ0ZpbGVcclxuICAgICAgICA/IHsgbGluazogc2FmZU51bWVyaWNMaW5rKCdndWlkZS8nICsgcmVsUHJlZml4ICsgbWF0Y2hpbmdGaWxlLm5hbWUpIH1cclxuICAgICAgICA6IHt9KSxcclxuICAgICAgaXRlbXM6IGNoaWxkcmVuLFxyXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICBpZiAoaGFuZGxlZC5oYXMoZmlsZS5uYW1lKSkgY29udGludWVcclxuICAgIGNvbnN0IHJlbGF0aXZlRmlsZSA9ICdndWlkZS8nICsgcmVsUHJlZml4ICsgZmlsZS5uYW1lXHJcbiAgICBjb25zdCBsaW5rID0gc2FmZU51bWVyaWNMaW5rKHJlbGF0aXZlRmlsZSlcclxuICAgIGlmICghbGluaykgY29udGludWVcclxuICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICB0ZXh0OiBmaWxlLm5hbWUucmVwbGFjZSgvXFwubWQkLywgJycpLFxyXG4gICAgICBsaW5rXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zXHJcbn1cclxuXHJcbmNvbnN0IHByZWZlcnJlZE1haW5Eb2MgPSAnZ3VpZGUvRW50aXNNQVhJVi9FbnRpc01heElWXHU1RTJFXHU1MkE5XHU2NTg3XHU2ODYzLm1kJ1xyXG5jb25zdCBtYWluRG9jID0gaW5jbHVkZWRTZXQuaGFzKHByZWZlcnJlZE1haW5Eb2MpXHJcbiAgPyBwcmVmZXJyZWRNYWluRG9jXHJcbiAgOiBpbmNsdWRlZEZpbGVzWzBdID8/ICcnXHJcbmNvbnN0IGd1aWRlU2lkZWJhciA9IGJ1aWxkU2lkZWJhcihndWlkZURpciwgJycpXHJcblxyXG5jb25zdCBwcmltYXJ5RG9jTGluayA9IHNhZmVOdW1lcmljTGluayhtYWluRG9jKSA/PyAnL2d1aWRlLydcclxuY29uc3QgZGV2UG9ydGFsRmVhdHVyZXMgPSBbXHJcbiAge1xyXG4gICAgdGl0bGU6ICdFbnRpc01heCA0LjAnLFxyXG4gICAgZGV0YWlsczogJ1x1OEZEQlx1NTE2NSBFbnRpc01heCA0LnggXHU4QkJFXHU1OTA3XHU1Qjg5XHU4OEM1XHUzMDAxXHU3Q0ZCXHU3RURGXHU5MTREXHU3RjZFXHU0RTBFXHU3RUY0XHU2MkE0XHU2NTg3XHU2ODYzXHUzMDAyJyxcclxuICAgIGxpbms6ICdodHRwOi8vbG9jYWxob3N0OjUxNzQvJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGl0bGU6ICdFbnRpc01heCA1LjAnLFxyXG4gICAgZGV0YWlsczogJ1x1OEZEQlx1NTE2NSBFbnRpc01heCA1LnggXHU4QkJFXHU1OTA3XHU1Qjg5XHU4OEM1XHUzMDAxXHU3Q0ZCXHU3RURGXHU5MTREXHU3RjZFXHU0RTBFXHU3RUY0XHU2MkE0XHU2NTg3XHU2ODYzXHUzMDAyJyxcclxuICAgIGxpbms6IGBodHRwOi8vbG9jYWxob3N0OjUxNzUke3ByaW1hcnlEb2NMaW5rfWBcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiAnRW50aXNMTkcgNC4wJyxcclxuICAgIGRldGFpbHM6ICdcdThGREJcdTUxNjUgRW50aXNMTkcgNC54IFx1OEJCRVx1NTkwN1x1NUI4OVx1ODhDNVx1MzAwMVx1N0NGQlx1N0VERlx1OTE0RFx1N0Y2RVx1NEUwRVx1N0VGNFx1NjJBNFx1NjU4N1x1Njg2M1x1MzAwMicsXHJcbiAgICBsaW5rOiAnaHR0cDovL2xvY2FsaG9zdDo1MTc2LydcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiAnRW50aXNMTkcgNS4wJyxcclxuICAgIGRldGFpbHM6ICdcdThGREJcdTUxNjUgRW50aXNMTkcgNS54IFx1OEJCRVx1NTkwN1x1NUI4OVx1ODhDNVx1MzAwMVx1N0NGQlx1N0VERlx1OTE0RFx1N0Y2RVx1NEUwRVx1N0VGNFx1NjJBNFx1NjU4N1x1Njg2M1x1MzAwMicsXHJcbiAgICBsaW5rOiAnaHR0cDovL2xvY2FsaG9zdDo1MTc3LydcclxuICB9XHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogdGFyZ2V0LmJhc2UsXHJcbiAgb3V0RGlyOiB0YXJnZXQub3V0RGlyLFxyXG4gIGNhY2hlRGlyOiB0YXJnZXQuY2FjaGVEaXIsXHJcbiAgc3JjRXhjbHVkZSxcclxuICB0aXRsZTogdGFyZ2V0LnRpdGxlLFxyXG4gIGRlc2NyaXB0aW9uOiB0YXJnZXQuZGVzY3JpcHRpb24sXHJcbiAgbGFuZzogJ3poLUNOJyxcclxuICBoZWFkOiBbXHJcbiAgICBbJ3NjcmlwdCcsIHt9LCBzaWRlYmFyUmVzaXplclNjcmlwdF0sXHJcbiAgICAuLi4ocHJvY2Vzcy5lbnYuRE9DU19CQVNFID09PSAnLydcclxuICAgICAgPyBbXVxyXG4gICAgICA6IFtbJ3NjcmlwdCcsIHt9LCBidWlsZFZhcmlhbnRTd2l0Y2hlclNjcmlwdCh0YXJnZXQpXV0pXHJcbiAgXSxcclxuICBhcHBlYXJhbmNlOiAnZGFyaycsXHJcbiAgaWdub3JlRGVhZExpbmtzOiB0cnVlLFxyXG4gIHJld3JpdGVzLFxyXG4gIHRyYW5zZm9ybVBhZ2VEYXRhKHBhZ2VEYXRhOiBhbnkpIHtcclxuICAgIGNvbnN0IGhlcm8gPSBwYWdlRGF0YT8uZnJvbnRtYXR0ZXI/Lmhlcm9cclxuICAgIGlmIChoZXJvKSB7XHJcbiAgICAgIGhlcm8ubmFtZSA9IHRhcmdldC5wcm9kdWN0TmFtZVxyXG4gICAgICBoZXJvLnRleHQgPSBgJHt0YXJnZXQudmVyc2lvbkxhYmVsfSBcdTVFMkVcdTUyQTlcdTRFMkRcdTVGQzNgXHJcbiAgICAgIGhlcm8udGFnbGluZSA9ICdcdThCQkVcdTU5MDdcdTVCODlcdTg4QzVcdTMwMDFcdTdDRkJcdTdFREZcdTkxNERcdTdGNkVcdTMwMDFcdTY0Q0RcdTRGNUNcdTRFMEVcdTdFRjRcdTYyQTRcdTRFMDBcdTdBRDlcdTVGMEZcdTY1ODdcdTY4NjMnXHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFjayA9IHNhZmVOdW1lcmljTGluayhtYWluRG9jKSA/PyAnL2d1aWRlLydcclxuICAgICAgY29uc3QgcHJlZmVycmVkSW5zdGFsbERvYyA9XHJcbiAgICAgICAgJ2d1aWRlL0VudGlzTUFYSVYvRW50aXNNYXhJVlx1NUUyRVx1NTJBOVx1NjU4N1x1Njg2My9cdTVCODlcdTg4QzVcdTUzNzhcdThGN0RcdThCRjRcdTY2MEUubWQnXHJcbiAgICAgIGNvbnN0IGluc3RhbGxMaW5rID0gc2FmZU51bWVyaWNMaW5rKHByZWZlcnJlZEluc3RhbGxEb2MpID8/IGZhbGxiYWNrXHJcblxyXG4gICAgICBoZXJvLmFjdGlvbnMgPSBbXHJcbiAgICAgICAgeyB0aGVtZTogJ2JyYW5kJywgdGV4dDogJ1x1OEZEQlx1NTE2NVx1NjU4N1x1Njg2MycsIGxpbms6IGZhbGxiYWNrIH0sXHJcbiAgICAgICAgeyB0aGVtZTogJ2FsdCcsIHRleHQ6ICdcdTVCODlcdTg4QzVcdTRFMEVcdTkxNERcdTdGNkUnLCBsaW5rOiBpbnN0YWxsTGluayB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFnZURhdGFcclxuICB9LFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBjb25maWc6IChtZCkgPT4ge1xyXG4gICAgICBjb25zdCB2YXJpYW50V2FybmluZ3MgPSBuZXcgU2V0PHN0cmluZz4oKVxyXG4gICAgICBjb25zdCB3YXJuVmFyaWFudCA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAodmFyaWFudFdhcm5pbmdzLmhhcyhtZXNzYWdlKSkgcmV0dXJuXHJcbiAgICAgICAgdmFyaWFudFdhcm5pbmdzLmFkZChtZXNzYWdlKVxyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgIGBbdmFyaWFudHNdICR7dGFyZ2V0LnByb2R1Y3ROYW1lfSAke3RhcmdldC52ZXJzaW9uTGFiZWx9OiAke21lc3NhZ2V9YFxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG5cclxuICAgICAgcmVnaXN0ZXJWYXJpYW50QmxvY2tGaWx0ZXIobWQsIHRhcmdldCwgd2FyblZhcmlhbnQpXHJcblxyXG4gICAgICBtZC5jb3JlLnJ1bGVyLnB1c2goJ3ZhcmlhbnQtbnVtZXJpYy1wZXJtYWxpbmtzJywgKHN0YXRlOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gc3RhdGUuZW52Py5yZWxhdGl2ZVBhdGggYXMgc3RyaW5nIHwgdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCFjdXJyZW50KSByZXR1cm5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHN0YXRlLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgIGNvbnN0IHRva2VuID0gc3RhdGUudG9rZW5zW2luZGV4XVxyXG4gICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdsaW5rX29wZW4nKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgIGNvbnN0IGhyZWYgPSB0b2tlbi5hdHRyR2V0KCdocmVmJylcclxuICAgICAgICAgIGlmICghaHJlZiB8fCAvXihodHRwcz86fG1haWx0bzp8IykvaS50ZXN0KGhyZWYpKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgIGNvbnN0IGhhc2hJbmRleCA9IGhyZWYuaW5kZXhPZignIycpXHJcbiAgICAgICAgICBjb25zdCByYXdQYXRoID0gaGFzaEluZGV4ID49IDAgPyBocmVmLnNsaWNlKDAsIGhhc2hJbmRleCkgOiBocmVmXHJcbiAgICAgICAgICBjb25zdCBoYXNoID0gaGFzaEluZGV4ID49IDAgPyBocmVmLnNsaWNlKGhhc2hJbmRleCkgOiAnJ1xyXG4gICAgICAgICAgaWYgKCFyYXdQYXRoKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgIGxldCBkZWNvZGVkOiBzdHJpbmdcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQocmF3UGF0aClcclxuICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICBkZWNvZGVkID0gcmF3UGF0aFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFkZWNvZGVkLmVuZHNXaXRoKCcubWQnKSkgY29udGludWVcclxuXHJcbiAgICAgICAgICBjb25zdCBjbGVhbiA9IGRlY29kZWQucmVwbGFjZSgvXlxcLysvLCAnJylcclxuICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gZGVjb2RlZC5zdGFydHNXaXRoKCcvJylcclxuICAgICAgICAgICAgPyBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShjbGVhbilcclxuICAgICAgICAgICAgOiBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShwYXRoLnBvc2l4LmpvaW4ocGF0aC5wb3NpeC5kaXJuYW1lKGN1cnJlbnQpLCBjbGVhbikpXHJcblxyXG4gICAgICAgICAgY29uc3QgbnVtZXJpYyA9IG51bWVyaWNMaW5rKHJlc29sdmVkKVxyXG4gICAgICAgICAgaWYgKCFudW1lcmljKSBjb250aW51ZVxyXG5cclxuICAgICAgICAgIGlmICghaW5jbHVkZWRTZXQuaGFzKHJlc29sdmVkKSkge1xyXG4gICAgICAgICAgICB0b2tlbi50eXBlID0gJ3RleHQnXHJcbiAgICAgICAgICAgIHRva2VuLnRhZyA9ICcnXHJcbiAgICAgICAgICAgIHRva2VuLmNvbnRlbnQgPSAnJ1xyXG4gICAgICAgICAgICB0b2tlbi5hdHRycyA9IG51bGxcclxuICAgICAgICAgICAgdG9rZW4ubWV0YSA9IG51bGxcclxuICAgICAgICAgICAgdG9rZW4ubmVzdGluZyA9IDBcclxuXHJcbiAgICAgICAgICAgIGxldCBkZXB0aCA9IDFcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGluZGV4ICsgMTsgaiA8IHN0YXRlLnRva2Vucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzdGF0ZS50b2tlbnNbal1cclxuICAgICAgICAgICAgICBpZiAobmV4dC50eXBlID09PSAnbGlua19vcGVuJykgZGVwdGgrK1xyXG4gICAgICAgICAgICAgIGlmIChuZXh0LnR5cGUgPT09ICdsaW5rX2Nsb3NlJykge1xyXG4gICAgICAgICAgICAgICAgZGVwdGgtLVxyXG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5leHQudHlwZSA9ICd0ZXh0J1xyXG4gICAgICAgICAgICAgICAgICBuZXh0LnRhZyA9ICcnXHJcbiAgICAgICAgICAgICAgICAgIG5leHQuY29udGVudCA9ICcnXHJcbiAgICAgICAgICAgICAgICAgIG5leHQuYXR0cnMgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgIG5leHQubWV0YSA9IG51bGxcclxuICAgICAgICAgICAgICAgICAgbmV4dC5uZXN0aW5nID0gMFxyXG4gICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRva2VuLmF0dHJTZXQoJ2hyZWYnLCBudW1lcmljICsgaGFzaClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogJ1x1NUUyRVx1NTJBOVx1NjU4N1x1Njg2MycsIGxpbms6IHNhZmVOdW1lcmljTGluayhtYWluRG9jKSA/PyAnL2d1aWRlLycgfVxyXG4gICAgXSxcclxuICAgIHNpZGViYXI6IHtcclxuICAgICAgJy9ndWlkZS8nOiBndWlkZVNpZGViYXJcclxuICAgIH0sXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6ICdsb2NhbCcsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICB0cmFuc2xhdGlvbnM6IHtcclxuICAgICAgICAgIGJ1dHRvbjoge1xyXG4gICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcclxuICAgICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1vZGFsOiB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXRhaWxzOiAnXHU2NjNFXHU3OTNBXHU4QkU2XHU2MEM1JyxcclxuICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogJ1x1NkUwNVx1OTY2NFx1NjdFNVx1OEJFMicsXHJcbiAgICAgICAgICAgIGJhY2tCdXR0b25UaXRsZTogJ1x1OEZENFx1NTZERScsXHJcbiAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY3MkFcdTYyN0VcdTUyMzBcdTdFRDNcdTY3OUMnLFxyXG4gICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICBzZWxlY3RUZXh0OiAnXHU5MDA5XHU2MkU5JyxcclxuICAgICAgICAgICAgICBzZWxlY3RLZXlBcmlhTGFiZWw6ICdcdTkwMDlcdTYyRTlcdTk1MkUnLFxyXG4gICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ1x1NTIwN1x1NjM2MicsXHJcbiAgICAgICAgICAgICAgbmF2aWdhdGVVcEtleUFyaWFMYWJlbDogJ1x1NTQxMVx1NEUwQScsXHJcbiAgICAgICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiAnXHU1NDExXHU0RTBCJyxcclxuICAgICAgICAgICAgICBjbG9zZVRleHQ6ICdcdTUxNzNcdTk1RUQnLFxyXG4gICAgICAgICAgICAgIGNsb3NlS2V5QXJpYUxhYmVsOiAnXHU1MTczXHU5NUVEXHU5NTJFJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtaW5pU2VhcmNoOiB7XHJcbiAgICAgICAgICBzZWFyY2hPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGJvb3N0OiB7IHRpdGxlOiA0LCB0aXRsZXM6IDMsIHRleHQ6IDIgfSxcclxuICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxyXG4gICAgICAgICAgICBmdXp6eTogMC4yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZG9jRm9vdGVyOiB7XHJcbiAgICAgIHByZXY6ICdcdTRFMEFcdTRFMDBcdTdCQzcnLFxyXG4gICAgICBuZXh0OiAnXHU0RTBCXHU0RTAwXHU3QkM3J1xyXG4gICAgfSxcclxuICAgIG91dGxpbmU6IHtcclxuICAgICAgbGV2ZWw6IFsyLCAzXVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qZWN0LkVudGlzTUFYU3lzdGVtLkNvZGVzXFxcXEhlbHBEb2NcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxQcm9qZWN0LkVudGlzTUFYU3lzdGVtLkNvZGVzXFxcXEhlbHBEb2NcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXHZhcmlhbnRzLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUHJvamVjdC5FbnRpc01BWFN5c3RlbS5Db2Rlcy9IZWxwRG9jL2RvY3MvLnZpdGVwcmVzcy92YXJpYW50cy5tdHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuXHJcbmV4cG9ydCB0eXBlIFByb2R1Y3QgPSAnbWF4JyB8ICdsbmcnXHJcbmV4cG9ydCB0eXBlIFZlcnNpb24gPSA0IHwgNVxyXG5cclxuZXhwb3J0IHR5cGUgVGFyZ2V0ID0ge1xyXG4gIHByb2R1Y3Q6IFByb2R1Y3RcclxuICB2ZXJzaW9uOiBWZXJzaW9uXHJcbiAgcHJvZHVjdE5hbWU6IHN0cmluZ1xyXG4gIHZlcnNpb25MYWJlbDogc3RyaW5nXHJcbiAgYmFzZTogc3RyaW5nXHJcbiAgb3V0RGlyOiBzdHJpbmdcclxuICBjYWNoZURpcjogc3RyaW5nXHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBST0RVQ1RfVEFHX01BWCA9ICdQdWJsaXNoRm9yTWF4J1xyXG5leHBvcnQgY29uc3QgUFJPRFVDVF9UQUdfTE5HID0gJ1B1Ymxpc2hGb3JMbmcnXHJcbmV4cG9ydCBjb25zdCBWRVJTSU9OX1RBR180ID0gJ1ZlcnNpb240J1xyXG5leHBvcnQgY29uc3QgVkVSU0lPTl9UQUdfNSA9ICdWZXJzaW9uNSdcclxuXHJcbmV4cG9ydCBjb25zdCBLTk9XTl9UQUdTID0gW1xyXG4gIFBST0RVQ1RfVEFHX01BWCxcclxuICBQUk9EVUNUX1RBR19MTkcsXHJcbiAgVkVSU0lPTl9UQUdfNCxcclxuICBWRVJTSU9OX1RBR181XHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCBUQVJHRVRTOiBUYXJnZXRbXSA9IFtcclxuICB7XHJcbiAgICBwcm9kdWN0OiAnbWF4JyxcclxuICAgIHZlcnNpb246IDQsXHJcbiAgICBwcm9kdWN0TmFtZTogJ0VudGlzTWF4JyxcclxuICAgIHZlcnNpb25MYWJlbDogJzQuMCcsXHJcbiAgICBiYXNlOiAnL2VudGlzbWF4L3Y0LycsXHJcbiAgICBvdXREaXI6ICcudml0ZXByZXNzL2Rpc3QvZW50aXNtYXgvdjQnLFxyXG4gICAgY2FjaGVEaXI6ICcudml0ZXByZXNzL2NhY2hlL2VudGlzbWF4LXY0JyxcclxuICAgIHRpdGxlOiAnRW50aXNNYXggNC4wIFx1NUUyRVx1NTJBOVx1NjU4N1x1Njg2MycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0VudGlzTWF4IDQuMCBcdTRFQTdcdTU0QzFcdTVFMkVcdTUyQTlcdTRFMkRcdTVGQzMnXHJcbiAgfSxcclxuICB7XHJcbiAgICBwcm9kdWN0OiAnbWF4JyxcclxuICAgIHZlcnNpb246IDUsXHJcbiAgICBwcm9kdWN0TmFtZTogJ0VudGlzTWF4JyxcclxuICAgIHZlcnNpb25MYWJlbDogJzUuMCcsXHJcbiAgICBiYXNlOiAnL2VudGlzbWF4L3Y1LycsXHJcbiAgICBvdXREaXI6ICcudml0ZXByZXNzL2Rpc3QvZW50aXNtYXgvdjUnLFxyXG4gICAgY2FjaGVEaXI6ICcudml0ZXByZXNzL2NhY2hlL2VudGlzbWF4LXY1JyxcclxuICAgIHRpdGxlOiAnRW50aXNNYXggNS4wIFx1NUUyRVx1NTJBOVx1NjU4N1x1Njg2MycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0VudGlzTWF4IDUuMCBcdTRFQTdcdTU0QzFcdTVFMkVcdTUyQTlcdTRFMkRcdTVGQzMnXHJcbiAgfSxcclxuICB7XHJcbiAgICBwcm9kdWN0OiAnbG5nJyxcclxuICAgIHZlcnNpb246IDQsXHJcbiAgICBwcm9kdWN0TmFtZTogJ0VudGlzTE5HJyxcclxuICAgIHZlcnNpb25MYWJlbDogJzQuMCcsXHJcbiAgICBiYXNlOiAnL2VudGlzbG5nL3Y0LycsXHJcbiAgICBvdXREaXI6ICcudml0ZXByZXNzL2Rpc3QvZW50aXNsbmcvdjQnLFxyXG4gICAgY2FjaGVEaXI6ICcudml0ZXByZXNzL2NhY2hlL2VudGlzbG5nLXY0JyxcclxuICAgIHRpdGxlOiAnRW50aXNMTkcgNC4wIFx1NUUyRVx1NTJBOVx1NjU4N1x1Njg2MycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0VudGlzTE5HIDQuMCBcdTRFQTdcdTU0QzFcdTVFMkVcdTUyQTlcdTRFMkRcdTVGQzMnXHJcbiAgfSxcclxuICB7XHJcbiAgICBwcm9kdWN0OiAnbG5nJyxcclxuICAgIHZlcnNpb246IDUsXHJcbiAgICBwcm9kdWN0TmFtZTogJ0VudGlzTE5HJyxcclxuICAgIHZlcnNpb25MYWJlbDogJzUuMCcsXHJcbiAgICBiYXNlOiAnL2VudGlzbG5nL3Y1LycsXHJcbiAgICBvdXREaXI6ICcudml0ZXByZXNzL2Rpc3QvZW50aXNsbmcvdjUnLFxyXG4gICAgY2FjaGVEaXI6ICcudml0ZXByZXNzL2NhY2hlL2VudGlzbG5nLXY1JyxcclxuICAgIHRpdGxlOiAnRW50aXNMTkcgNS4wIFx1NUUyRVx1NTJBOVx1NjU4N1x1Njg2MycsXHJcbiAgICBkZXNjcmlwdGlvbjogJ0VudGlzTE5HIDUuMCBcdTRFQTdcdTU0QzFcdTVFMkVcdTUyQTlcdTRFMkRcdTVGQzMnXHJcbiAgfVxyXG5dXHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVQcm9kdWN0KHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBQcm9kdWN0IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gKHZhbHVlID8/ICcnKS50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gIGlmICghbm9ybWFsaXplZCB8fCBub3JtYWxpemVkID09PSAnbWF4JyB8fCBub3JtYWxpemVkID09PSAnZW50aXNtYXgnKSByZXR1cm4gJ21heCdcclxuICBpZiAobm9ybWFsaXplZCA9PT0gJ2xuZycgfHwgbm9ybWFsaXplZCA9PT0gJ2VudGlzbG5nJykgcmV0dXJuICdsbmcnXHJcbiAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgYERPQ1NfUFJPRFVDVCBcdTUzRUFcdTY1MkZcdTYzMDEgbWF4L2VudGlzbWF4IFx1NjIxNiBsbmcvZW50aXNsbmdcdUZGMENcdTVGNTNcdTUyNERcdTUwM0NcdUZGMUEke3ZhbHVlfWBcclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZVZlcnNpb24odmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCk6IFZlcnNpb24ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSAodmFsdWUgPz8gJycpLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL152LywgJycpXHJcbiAgaWYgKCFub3JtYWxpemVkIHx8IG5vcm1hbGl6ZWQgPT09ICc1JyB8fCBub3JtYWxpemVkID09PSAnNS4wJykgcmV0dXJuIDVcclxuICBpZiAobm9ybWFsaXplZCA9PT0gJzQnIHx8IG5vcm1hbGl6ZWQgPT09ICc0LjAnKSByZXR1cm4gNFxyXG4gIHRocm93IG5ldyBFcnJvcihgRE9DU19WRVJTSU9OIFx1NTNFQVx1NjUyRlx1NjMwMSA0LzQuMCBcdTYyMTYgNS81LjBcdUZGMENcdTVGNTNcdTUyNERcdTUwM0NcdUZGMUEke3ZhbHVlfWApXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVGFyZ2V0KCk6IFRhcmdldCB7XHJcbiAgY29uc3QgcHJvZHVjdCA9IG5vcm1hbGl6ZVByb2R1Y3QocHJvY2Vzcy5lbnYuRE9DU19QUk9EVUNUKVxyXG4gIGNvbnN0IHZlcnNpb24gPSBub3JtYWxpemVWZXJzaW9uKHByb2Nlc3MuZW52LkRPQ1NfVkVSU0lPTilcclxuICBjb25zdCB0YXJnZXQgPSBUQVJHRVRTLmZpbmQoXHJcbiAgICAoaXRlbSkgPT4gaXRlbS5wcm9kdWN0ID09PSBwcm9kdWN0ICYmIGl0ZW0udmVyc2lvbiA9PT0gdmVyc2lvblxyXG4gIClcclxuICBpZiAoIXRhcmdldCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBcdTY3MkFcdTYyN0VcdTUyMzBcdTY3ODRcdTVFRkFcdTc2RUVcdTY4MDdcdUZGMUEke3Byb2R1Y3R9IHYke3ZlcnNpb259YClcclxuICB9XHJcbiAgaWYgKHByb2Nlc3MuZW52LkRPQ1NfQkFTRSA9PT0gJy8nKSB7XHJcbiAgICByZXR1cm4geyAuLi50YXJnZXQsIGJhc2U6ICcvJyB9XHJcbiAgfVxyXG4gIHJldHVybiB0YXJnZXRcclxufVxyXG5cclxuZnVuY3Rpb24gdW5xdW90ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpXHJcbiAgaWYgKHRyaW1tZWQubGVuZ3RoID49IDIpIHtcclxuICAgIGNvbnN0IGZpcnN0ID0gdHJpbW1lZFswXVxyXG4gICAgY29uc3QgbGFzdCA9IHRyaW1tZWRbdHJpbW1lZC5sZW5ndGggLSAxXVxyXG4gICAgaWYgKChmaXJzdCA9PT0gXCInXCIgJiYgbGFzdCA9PT0gXCInXCIpIHx8IChmaXJzdCA9PT0gJ1wiJyAmJiBsYXN0ID09PSAnXCInKSkge1xyXG4gICAgICByZXR1cm4gdHJpbW1lZC5zbGljZSgxLCAtMSkudHJpbSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cmltbWVkXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlSW5saW5lVGFncyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKClcclxuICBpZiAoIXRyaW1tZWQgfHwgdHJpbW1lZCA9PT0gJ1tdJykgcmV0dXJuIFtdXHJcblxyXG4gIGNvbnN0IGlubmVyID0gdHJpbW1lZC5zdGFydHNXaXRoKCdbJykgJiYgdHJpbW1lZC5lbmRzV2l0aCgnXScpXHJcbiAgICA/IHRyaW1tZWQuc2xpY2UoMSwgLTEpXHJcbiAgICA6IHRyaW1tZWRcclxuXHJcbiAgcmV0dXJuIGlubmVyXHJcbiAgICAuc3BsaXQoJywnKVxyXG4gICAgLm1hcCh1bnF1b3RlKVxyXG4gICAgLmZpbHRlcihCb29sZWFuKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGcm9udE1hdHRlclRhZ3MoY29udGVudDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IHRleHQgPSBjb250ZW50LnJlcGxhY2UoL15cXHVGRUZGLywgJycpXHJcbiAgaWYgKCF0ZXh0LnN0YXJ0c1dpdGgoJy0tLScpKSByZXR1cm4gW11cclxuXHJcbiAgY29uc3QgbGluZXMgPSB0ZXh0LnNwbGl0KC9cXHI/XFxuLylcclxuICBsZXQgZW5kID0gLTFcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAobGluZXNbaV0udHJpbSgpID09PSAnLS0tJykge1xyXG4gICAgICBlbmQgPSBpXHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChlbmQgPCAwKSByZXR1cm4gW11cclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgY29uc3QgbGluZSA9IGxpbmVzW2ldXHJcbiAgICBjb25zdCBtYXRjaCA9IC9edGFnc1xccyo6XFxzKiguKikkLy5leGVjKGxpbmUpXHJcbiAgICBpZiAoIW1hdGNoKSBjb250aW51ZVxyXG5cclxuICAgIGNvbnN0IHJlc3QgPSBtYXRjaFsxXS50cmltKClcclxuICAgIGlmIChyZXN0KSByZXR1cm4gcGFyc2VJbmxpbmVUYWdzKHJlc3QpXHJcblxyXG4gICAgY29uc3QgdGFnczogc3RyaW5nW10gPSBbXVxyXG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgZW5kOyBqKyspIHtcclxuICAgICAgY29uc3QgaXRlbSA9IC9eXFxzKi1cXHMrKC4rPylcXHMqJC8uZXhlYyhsaW5lc1tqXSlcclxuICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgaWYgKGxpbmVzW2pdLnRyaW0oKSA9PT0gJycpIGNvbnRpbnVlXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB0YWcgPSB1bnF1b3RlKGl0ZW1bMV0pXHJcbiAgICAgIGlmICh0YWcpIHRhZ3MucHVzaCh0YWcpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFnc1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFtdXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWFkVGFncyhmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gcGFyc2VGcm9udE1hdHRlclRhZ3MoZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKSlcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5jbHVkZWQodGFnczogc3RyaW5nW10sIHRhcmdldDogVGFyZ2V0KTogYm9vbGVhbiB7XHJcbiAgY29uc3QgaGFzTWF4ID0gdGFncy5pbmNsdWRlcyhQUk9EVUNUX1RBR19NQVgpXHJcbiAgY29uc3QgaGFzTG5nID0gdGFncy5pbmNsdWRlcyhQUk9EVUNUX1RBR19MTkcpXHJcbiAgY29uc3QgcHJvZHVjdEluY2x1ZGVkID1cclxuICAgICFoYXNNYXggJiYgIWhhc0xuZyA/IHRydWUgOiBoYXNNYXggJiYgaGFzTG5nID8gdHJ1ZSA6IGhhc01heFxyXG4gICAgICA/IHRhcmdldC5wcm9kdWN0ID09PSAnbWF4J1xyXG4gICAgICA6IHRhcmdldC5wcm9kdWN0ID09PSAnbG5nJ1xyXG5cclxuICBjb25zdCBoYXM0ID0gdGFncy5pbmNsdWRlcyhWRVJTSU9OX1RBR180KVxyXG4gIGNvbnN0IGhhczUgPSB0YWdzLmluY2x1ZGVzKFZFUlNJT05fVEFHXzUpXHJcbiAgY29uc3QgdmVyc2lvbkluY2x1ZGVkID1cclxuICAgICFoYXM0ICYmICFoYXM1ID8gdHJ1ZSA6IGhhczQgJiYgaGFzNSA/IHRydWUgOiBoYXM0XHJcbiAgICAgID8gdGFyZ2V0LnZlcnNpb24gPT09IDRcclxuICAgICAgOiB0YXJnZXQudmVyc2lvbiA9PT0gNVxyXG5cclxuICByZXR1cm4gcHJvZHVjdEluY2x1ZGVkICYmIHZlcnNpb25JbmNsdWRlZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlR2xvYlBhdHRlcm4odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3Qgc3BlY2lhbCA9ICdcXFxcKj98KClbXXt9ISdcclxuICByZXR1cm4gdmFsdWVcclxuICAgIC5zcGxpdCgnJylcclxuICAgIC5tYXAoKGNoYXIpID0+IChzcGVjaWFsLmluY2x1ZGVzKGNoYXIpID8gYFxcXFwke2NoYXJ9YCA6IGNoYXIpKVxyXG4gICAgLmpvaW4oJycpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVZhcmlhbnRCbG9ja0NvbmRpdGlvbnMoXHJcbiAgcmF3OiBzdHJpbmcsXHJcbiAgd2Fybj86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWRcclxuKTogc3RyaW5nW10ge1xyXG4gIGNvbnN0IGNvbmRpdGlvbnM6IHN0cmluZ1tdID0gW11cclxuICBmb3IgKGNvbnN0IHBhcnQgb2YgcmF3LnNwbGl0KCcsJykpIHtcclxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IHVucXVvdGUocGFydC50cmltKCkpXHJcbiAgICBpZiAoIWNvbmRpdGlvbikgY29udGludWVcclxuICAgIGlmICghS05PV05fVEFHUy5pbmNsdWRlcyhjb25kaXRpb24pKSB7XHJcbiAgICAgIHdhcm4/LihgXHU2NzJBXHU3N0U1XHU2QjYzXHU2NTg3XHU2NzYxXHU0RUY2XHVGRjFBJHtjb25kaXRpb259YClcclxuICAgICAgY29udGludWVcclxuICAgIH1cclxuICAgIGNvbmRpdGlvbnMucHVzaChjb25kaXRpb24pXHJcbiAgfVxyXG4gIHJldHVybiBjb25kaXRpb25zXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhbnRCbG9ja0luY2x1ZGVkKFxyXG4gIGNvbmRpdGlvbnM6IHN0cmluZ1tdLFxyXG4gIHRhcmdldDogVGFyZ2V0XHJcbik6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpc0luY2x1ZGVkKGNvbmRpdGlvbnMsIHRhcmdldClcclxufVxyXG5cclxudHlwZSBWYXJpYW50RnJhbWUgPSB7XHJcbiAgaW5jbHVkZTogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJWYXJpYW50QmxvY2tGaWx0ZXIoXHJcbiAgbWQ6IGFueSxcclxuICB0YXJnZXQ6IFRhcmdldCxcclxuICB3YXJuOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkXHJcbik6IHZvaWQge1xyXG4gIGNvbnN0IHdhcm5lZCA9IG5ldyBTZXQ8c3RyaW5nPigpXHJcbiAgY29uc3Qgd2Fybk9uY2UgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAod2FybmVkLmhhcyhtZXNzYWdlKSkgcmV0dXJuXHJcbiAgICB3YXJuZWQuYWRkKG1lc3NhZ2UpXHJcbiAgICB3YXJuKG1lc3NhZ2UpXHJcbiAgfVxyXG5cclxuICBtZC5jb3JlLnJ1bGVyLmJlZm9yZSgnYmxvY2snLCAndmFyaWFudC1ibG9jay1maWx0ZXInLCAoc3RhdGU6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgZmlsZSA9IHN0YXRlLmVudj8ucmVsYXRpdmVQYXRoID8/ICd1bmtub3duLm1kJ1xyXG4gICAgY29uc3QgbGluZXMgPSBTdHJpbmcoc3RhdGUuc3JjID8/ICcnKS5zcGxpdCgnXFxuJylcclxuICAgIGNvbnN0IG91dHB1dDogc3RyaW5nW10gPSBbXVxyXG4gICAgY29uc3Qgc3RhY2s6IFZhcmlhbnRGcmFtZVtdID0gW11cclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbSgpXHJcblxyXG4gICAgICBjb25zdCBodG1sU3RhcnQgPSAvXjwhLS1cXHMqdmFyaWFudFxccyo6XFxzKiguKj8pXFxzKi0tPiQvaS5leGVjKHRyaW1tZWQpXHJcbiAgICAgIGNvbnN0IHRleHRTdGFydCA9IC9eXFxbVkFSSUFOVFxccyo6XFxzKiguKj8pXFxzKlxcXSQvaS5leGVjKHRyaW1tZWQpXHJcbiAgICAgIGNvbnN0IHN0YXJ0TWF0Y2ggPSBodG1sU3RhcnQgPz8gdGV4dFN0YXJ0XHJcblxyXG4gICAgICBpZiAoc3RhcnRNYXRjaCkge1xyXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB3YXJuT25jZShgJHtmaWxlfTogXHU2OEMwXHU2RDRCXHU1MjMwXHU1RDRDXHU1OTU3XHU2NzYxXHU0RUY2XHU1NzU3XHVGRjBDXHU2MzA5XHU1QzMxXHU4RkQxXHU5MTREXHU1QkY5XHU1OTA0XHU3NDA2YClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IHBhcnNlVmFyaWFudEJsb2NrQ29uZGl0aW9ucyhzdGFydE1hdGNoWzFdID8/ICcnLCAobWVzc2FnZSkgPT5cclxuICAgICAgICAgIHdhcm5PbmNlKGAke2ZpbGV9OiAke21lc3NhZ2V9YClcclxuICAgICAgICApXHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5jbHVkZSA9IHN0YWNrLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5pbmNsdWRlXHJcbiAgICAgICAgc3RhY2sucHVzaCh7XHJcbiAgICAgICAgICBpbmNsdWRlOiBwYXJlbnRJbmNsdWRlICYmIGlzVmFyaWFudEJsb2NrSW5jbHVkZWQoY29uZGl0aW9ucywgdGFyZ2V0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaXNFbmQgPVxyXG4gICAgICAgIC9ePCEtLVxccypcXC9cXHMqdmFyaWFudFxccyotLT4kL2kudGVzdCh0cmltbWVkKSB8fFxyXG4gICAgICAgIC9eXFxbXFxzKlxcL1xccypWQVJJQU5UXFxzKlxcXSQvaS50ZXN0KHRyaW1tZWQpXHJcblxyXG4gICAgICBpZiAoaXNFbmQpIHtcclxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB3YXJuT25jZShgJHtmaWxlfTogXHU1M0QxXHU3M0IwXHU1QjY0XHU3QUNCXHU3Njg0XHU2NzYxXHU0RUY2XHU1NzU3XHU3RUQzXHU2NzVGXHU2ODA3XHU4QkIwYClcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YWNrLnBvcCgpXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMCB8fCBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5pbmNsdWRlKSB7XHJcbiAgICAgICAgb3V0cHV0LnB1c2gobGluZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHdhcm5PbmNlKGAke2ZpbGV9OiBcdTVCNThcdTU3MjhcdTY3MkFcdTk1RURcdTU0MDhcdTc2ODRcdTY3NjFcdTRFRjZcdTU3NTdcdTVGMDBcdTU5Q0JcdTY4MDdcdThCQjBgKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRlLnNyYyA9IG91dHB1dC5qb2luKCdcXG4nKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZFZhcmlhbnRTd2l0Y2hlclNjcmlwdCh0YXJnZXQ6IFRhcmdldCk6IHN0cmluZyB7XHJcbiAgY29uc3QgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIGN1cnJlbnRCYXNlOiB0YXJnZXQuYmFzZSxcclxuICAgIHRhcmdldHM6IFRBUkdFVFMubWFwKChpdGVtKSA9PiAoe1xyXG4gICAgICBsYWJlbDogYCR7aXRlbS5wcm9kdWN0TmFtZX0gJHtpdGVtLnZlcnNpb25MYWJlbH1gLFxyXG4gICAgICBiYXNlOiBpdGVtLmJhc2VcclxuICAgIH0pKVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiBgXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIERBVEEgPSAke2RhdGF9O1xyXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2YXJpYW50LXN3aXRjaGVyJykpIHJldHVybjtcclxuICAgIHZhciBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuVlBOYXZCYXJNZW51JykgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlZQTmF2QmFyJyk7XHJcbiAgICBpZiAoIW5hdikgcmV0dXJuO1xyXG5cclxuICAgIHZhciBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGJveC5pZCA9ICd2YXJpYW50LXN3aXRjaGVyJztcclxuICAgIGJveC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgYm94LnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcclxuICAgIGJveC5zdHlsZS5nYXAgPSAnNHB4JztcclxuICAgIGJveC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwcHgnO1xyXG5cclxuICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGxhYmVsLnRleHRDb250ZW50ID0gJ1x1NzI0OFx1NjcyQyc7XHJcbiAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcclxuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gJ3ZhcigtLXZwLWMtdGV4dC0yKSc7XHJcbiAgICBib3guYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcclxuICAgIHNlbGVjdC5pZCA9ICd2YXJpYW50LXRhcmdldC1zZWxlY3QnO1xyXG4gICAgc2VsZWN0LnN0eWxlLmhlaWdodCA9ICcyOHB4JztcclxuICAgIHNlbGVjdC5zdHlsZS5wYWRkaW5nID0gJzAgNnB4JztcclxuICAgIHNlbGVjdC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHZhcigtLXZwLWMtZGl2aWRlciknO1xyXG4gICAgc2VsZWN0LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc0cHgnO1xyXG4gICAgc2VsZWN0LnN0eWxlLmJhY2tncm91bmQgPSAndmFyKC0tdnAtYy1iZy1hbHQpJztcclxuICAgIHNlbGVjdC5zdHlsZS5jb2xvciA9ICd2YXIoLS12cC1jLXRleHQtMSknO1xyXG4gICAgc2VsZWN0LnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xyXG5cclxuICAgIERBVEEudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgb3B0aW9uLnZhbHVlID0gaXRlbS5iYXNlO1xyXG4gICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBpdGVtLmxhYmVsO1xyXG4gICAgICBpZiAoaXRlbS5iYXNlID09PSBEQVRBLmN1cnJlbnRCYXNlKSBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2VsZWN0LnZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm94LmFwcGVuZENoaWxkKHNlbGVjdCk7XHJcbiAgICBuYXYuYXBwZW5kQ2hpbGQoYm94KTtcclxuICB9XHJcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG1vdW50KTsgZWxzZSBtb3VudCgpO1xyXG59KSgpO1xyXG5gXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VixTQUFTLG9CQUFvQjtBQUN0WCxPQUFPQSxTQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCOzs7QUNIK1QsT0FBTyxRQUFRO0FBaUJyVyxJQUFNLGtCQUFrQjtBQUN4QixJQUFNLGtCQUFrQjtBQUN4QixJQUFNLGdCQUFnQjtBQUN0QixJQUFNLGdCQUFnQjtBQUV0QixJQUFNLGFBQWE7QUFBQSxFQUN4QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRU8sSUFBTSxVQUFvQjtBQUFBLEVBQy9CO0FBQUEsSUFDRSxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLGNBQWM7QUFBQSxJQUNkLE1B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QUFVO0FBQ2hCLGtCQUFNLFFBQVE7QUFDZCxrQkFBTSxPQUFPO0FBQ2Isa0JBQU0sVUFBVTtBQUVoQixnQkFBSSxRQUFRO0FBQ1oscUJBQVMsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLE9BQU8sUUFBUSxLQUFLO0FBQ3BELG9CQUFNLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDM0Isa0JBQUksS0FBSyxTQUFTLFlBQWE7QUFDL0Isa0JBQUksS0FBSyxTQUFTLGNBQWM7QUFDOUI7QUFDQSxvQkFBSSxVQUFVLEdBQUc7QUFDZix1QkFBSyxPQUFPO0FBQ1osdUJBQUssTUFBTTtBQUNYLHVCQUFLLFVBQVU7QUFDZix1QkFBSyxRQUFRO0FBQ2IsdUJBQUssT0FBTztBQUNaLHVCQUFLLFVBQVU7QUFDZjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFDQTtBQUFBLFVBQ0Y7QUFFQSxnQkFBTSxRQUFRLFFBQVEsVUFBVSxJQUFJO0FBQUEsUUFDdEM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLDRCQUFRLE1BQU0sZ0JBQWdCLE9BQU8sS0FBSyxVQUFVO0FBQUEsSUFDOUQ7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFVBQ0EsT0FBTztBQUFBLFlBQ0wsZ0JBQWdCO0FBQUEsWUFDaEIsa0JBQWtCO0FBQUEsWUFDbEIsaUJBQWlCO0FBQUEsWUFDakIsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLGNBQ04sWUFBWTtBQUFBLGNBQ1osb0JBQW9CO0FBQUEsY0FDcEIsY0FBYztBQUFBLGNBQ2Qsd0JBQXdCO0FBQUEsY0FDeEIsMEJBQTBCO0FBQUEsY0FDMUIsV0FBVztBQUFBLGNBQ1gsbUJBQW1CO0FBQUEsWUFDckI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1YsZUFBZTtBQUFBLFlBQ2IsT0FBTyxFQUFFLE9BQU8sR0FBRyxRQUFRLEdBQUcsTUFBTSxFQUFFO0FBQUEsWUFDdEMsUUFBUTtBQUFBLFlBQ1IsT0FBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJmcyIsICJ0YXJnZXQiLCAiZnMiXQp9Cg==
