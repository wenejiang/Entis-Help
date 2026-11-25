import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"日常运行","description":"","frontmatter":{"title":"日常运行","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1059.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/日常运行.md"}');
const _sfc_main = { name: "guide/1059.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="日常运行" tabindex="-1">日常运行 <a class="header-anchor" href="#日常运行" aria-label="Permalink to &quot;日常运行&quot;">​</a></h1><h1 id="日常运行-1" tabindex="-1">日常运行 <a class="header-anchor" href="#日常运行-1" aria-label="Permalink to &quot;日常运行&quot;">​</a></h1><p>日常运行</p><h2 id="日常运行-2" tabindex="-1">日常运行 <a class="header-anchor" href="#日常运行-2" aria-label="Permalink to &quot;日常运行&quot;">​</a></h2><p><strong>摘要</strong>：日常运行需要注意的事项</p><p><strong>1:注意事项</strong></p><ol><li>监控端在试用期结束后必须插入软件狗运行，客户端不需要</li><li>系统建议每月备份数据库一次，并把备份文件复制到电脑外部存储</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/日常运行.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ____ as default
};
