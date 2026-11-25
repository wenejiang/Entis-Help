import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"系统配置","description":"","frontmatter":{"title":"系统配置","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1084.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置.md"}');
const _sfc_main = { name: "guide/1084.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="系统配置" tabindex="-1">系统配置 <a class="header-anchor" href="#系统配置" aria-label="Permalink to &quot;系统配置&quot;">​</a></h1><p>‍</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ____ as default
};
