import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"HIMS密度计算","description":"","frontmatter":{"title":"HIMS密度计算","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1101.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/HIMS密度计算.md"}');
const _sfc_main = { name: "guide/1101.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="hims密度计算" tabindex="-1">HIMS密度计算 <a class="header-anchor" href="#hims密度计算" aria-label="Permalink to &quot;HIMS密度计算&quot;">​</a></h1><p>‍</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/HIMS密度计算.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HIMS____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  HIMS____ as default
};
