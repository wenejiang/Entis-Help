import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entismax/v4/assets/8f209245c65fcf9e-20261015000318-3t3h17q.DRP3ReF5.png";
const _imports_1 = "/entismax/v4/assets/77e56d33777be27a-20261015000316-mxjsepb.-wC7rb3J.gif";
const _imports_2 = "/entismax/v4/assets/f4d08b3b7d7385a6-20261015000318-abo0slp.CMIWudUX.png";
const __pageData = JSON.parse('{"title":"Modbus输入通讯配置模拟从机模式配置说明","description":"","frontmatter":{"title":"Modbus输入通讯配置模拟从机模式配置说明","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1104.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/Modbus输入通讯配置模拟从机模式/Modbus输入通讯配置模拟从机模式配置说明.md"}');
const _sfc_main = { name: "guide/1104.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="modbus输入通讯配置模拟从机模式配置说明" tabindex="-1">Modbus输入通讯配置模拟从机模式配置说明 <a class="header-anchor" href="#modbus输入通讯配置模拟从机模式配置说明" aria-label="Permalink to &quot;Modbus输入通讯配置模拟从机模式配置说明&quot;">​</a></h1><h1 id="modbus输入通讯配置模拟从机模式配置说明-1" tabindex="-1">Modbus输入通讯配置模拟从机模式配置说明 <a class="header-anchor" href="#modbus输入通讯配置模拟从机模式配置说明-1" aria-label="Permalink to &quot;Modbus输入通讯配置模拟从机模式配置说明&quot;">​</a></h1><p>Modbus输入通讯配置模拟从机模式配置说明</p><h3 id="第一步-通讯配置时-请按红圈所示配置" tabindex="-1">第一步，通讯配置时，请按红圈所示配置 <a class="header-anchor" href="#第一步-通讯配置时-请按红圈所示配置" aria-label="Permalink to &quot;第一步，通讯配置时，请按红圈所示配置&quot;">​</a></h3><p><img${ssrRenderAttr("src", _imports_0)} alt="">    <img${ssrRenderAttr("src", _imports_1)} alt="">如果选择了模拟Slave被动写入模式，则轮询间隔和超时重发次数失去意义<img${ssrRenderAttr("src", _imports_1)} alt="">CIU地址则使用为本机模拟的仪表地址</p><h3 id="第二步-仪表配置" tabindex="-1">第二步：仪表配置 <a class="header-anchor" href="#第二步-仪表配置" aria-label="Permalink to &quot;第二步：仪表配置&quot;">​</a></h3><p>除了功能码只能选择Read holding register以外，其他配置与之前一样。<img${ssrRenderAttr("src", _imports_2)} alt=""></p><hr><p><img${ssrRenderAttr("src", _imports_1)} alt="">当前Slave模式，只支持Modbus RTU协议，其他协议不支持</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/Modbus输入通讯配置模拟从机模式/Modbus输入通讯配置模拟从机模式配置说明.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Modbus________________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Modbus________________ as default
};
