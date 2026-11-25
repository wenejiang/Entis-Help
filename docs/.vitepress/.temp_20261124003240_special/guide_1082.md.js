import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_2 } from "./d0c4aff8c2a66e4c-20261015000319-tw41fxp.1G53O5ZT.js";
import { _ as _imports_7 } from "./77e56d33777be27a-20261015000319-4xgu630.DnMjTeiz.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/b323fae0251e83c2-20261015000319-2c7b10l.x81YR42d.png";
const _imports_1 = "/entislng/v5/assets/5c8eb869b1c4fd55-20261015000319-hoxasvm.DXu__J7A.png";
const _imports_3 = "/entislng/v5/assets/a01c4e40ea0bb007-20261015000319-xr8bzs0.CascJreB.png";
const __pageData = JSON.parse('{"title":"2：OPC输出配置","description":"","frontmatter":{"title":"2：OPC输出配置","date":"2026-10-14T16:03:19.000Z","lastmod":"2026-10-14T16:03:19.000Z"},"headers":[],"relativePath":"guide/1082.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控数据输出模块/2：OPC输出配置.md"}');
const _sfc_main = { name: "guide/1082.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_2-opc输出配置" tabindex="-1">2：OPC输出配置 <a class="header-anchor" href="#_2-opc输出配置" aria-label="Permalink to &quot;2：OPC输出配置&quot;">​</a></h1><h1 id="_2-opc输出配置-1" tabindex="-1">2：OPC输出配置 <a class="header-anchor" href="#_2-opc输出配置-1" aria-label="Permalink to &quot;2：OPC输出配置&quot;">​</a></h1><p>2：OPC输出配置</p><h1 id="opc输出配置" tabindex="-1">OPC输出配置 <a class="header-anchor" href="#opc输出配置" aria-label="Permalink to &quot;OPC输出配置&quot;">​</a></h1><hr><h3 id="_1-功能描述" tabindex="-1">1：功能描述 <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1：功能描述&quot;">​</a></h3><p>配置OPC输出项</p><h3 id="_2-如何开始使用" tabindex="-1">2：如何开始使用 <a class="header-anchor" href="#_2-如何开始使用" aria-label="Permalink to &quot;2：如何开始使用&quot;">​</a></h3><p>依此打开菜单&quot;罐监控输出模块&quot;=&gt;OPC输出配置,如图:<img${ssrRenderAttr("src", _imports_0)} alt="">显示界面如下:<img${ssrRenderAttr("src", _imports_1)} alt="">此界面只有一个选择项,&quot;是否启用OPC输出&quot;</p><h3 id="_3-操作说明" tabindex="-1">3：操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3：操作说明&quot;">​</a></h3><h5 id="opc字段配置" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">OPC字段配置 <a class="header-anchor" href="#opc字段配置" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000319-tw41fxp.gif)OPC字段配置&quot;">​</a></h5><p>点击按钮&quot;OPC配置&quot;,打开如下界面<img${ssrRenderAttr("src", _imports_3)} alt=""></p><hr><p><img${ssrRenderAttr("src", _imports_7)} alt="">OPC输出由于牵涉到Windows的认证问题,维护起来比较麻烦,建议使用Modbus输出方式或数据库输出方式</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控数据输出模块/2：OPC输出配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _2_OPC____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _2_OPC____ as default
};
