import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"ZZ条件块测试","description":"","frontmatter":{"title":"ZZ条件块测试"},"headers":[],"relativePath":"guide/1105.md","filePath":"guide/ZZ条件块测试.md"}');
const _sfc_main = { name: "guide/1105.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="zz条件块测试" tabindex="-1">ZZ条件块测试 <a class="header-anchor" href="#zz条件块测试" aria-label="Permalink to &quot;ZZ条件块测试&quot;">​</a></h1><p>下面是公共内容。</p><p>MAX_ONLY_BLOCK_TOKEN</p><p>V4_ONLY_BLOCK_TOKEN</p><p>结尾公共内容。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/ZZ条件块测试.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ZZ_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ZZ_____ as default
};
