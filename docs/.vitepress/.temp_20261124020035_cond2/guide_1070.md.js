import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"罐监控配置","description":"","frontmatter":{"title":"罐监控配置","date":"2026-10-14T16:03:19.000Z","lastmod":"2026-10-14T16:03:19.000Z"},"headers":[],"relativePath":"guide/1070.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置.md"}');
const _sfc_main = { name: "guide/1070.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="罐监控配置" tabindex="-1">罐监控配置 <a class="header-anchor" href="#罐监控配置" aria-label="Permalink to &quot;罐监控配置&quot;">​</a></h1><p>‍</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _____ as default
};
