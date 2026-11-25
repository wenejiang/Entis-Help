import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./5291123838ecf72d-20261015000319-n5whljg.BkkP8UAO.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_1 = "/entismax/v4/assets/32d7cb1259b69399-20261015000320-qz14fbi.BYOzl-F5.png";
const _imports_2 = "/entismax/v4/assets/6542174df6c91196-20261015000320-bafuiol.OmTX7V4M.png";
const __pageData = JSON.parse('{"title":"4 全局实时参数","description":"","frontmatter":{"title":"4 全局实时参数","date":"2026-10-14T16:03:20.000Z","lastmod":"2026-10-14T16:03:20.000Z"},"headers":[],"relativePath":"guide/1074.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置/4 全局实时参数.md"}');
const _sfc_main = { name: "guide/1074.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_4-全局实时参数" tabindex="-1">4 全局实时参数 <a class="header-anchor" href="#_4-全局实时参数" aria-label="Permalink to &quot;4 全局实时参数&quot;">​</a></h1><h1 id="_4-全局实时参数-1" tabindex="-1">4 全局实时参数 <a class="header-anchor" href="#_4-全局实时参数-1" aria-label="Permalink to &quot;4 全局实时参数&quot;">​</a></h1><p>4:全局实时参数</p><h1 id="全局实时参数" tabindex="-1">全局实时参数 <a class="header-anchor" href="#全局实时参数" aria-label="Permalink to &quot;全局实时参数&quot;">​</a></h1><hr><h3 id="_1-功能描述" tabindex="-1">1:功能描述： <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述：&quot;">​</a></h3><p>设置全局的参数，如环境温度，本地大气参数，重力参数等影响全局的一些计量参数</p><h3 id="_2-如何开始使用" tabindex="-1">2:如何开始使用： <a class="header-anchor" href="#_2-如何开始使用" aria-label="Permalink to &quot;2:如何开始使用：&quot;">​</a></h3><p><img${ssrRenderAttr("src", _imports_0)} alt="">依次打开菜单&quot;罐监控配置&quot; --&gt; &quot;全局实时参数&quot; 如图:</p><p><img${ssrRenderAttr("src", _imports_1)} alt="">打开窗口,如图:</p><h3 id="当勾选了禁用全局环境温度后-每个罐单独输入的环境温度才会起作用-否则会被全局环境温度更新当勾选了从仪表读取大气压值后-在配置仪表时-勾选p2更新大气压值-本地大气压会从仪表更新" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt=""><img${ssrRenderAttr("src", _imports_0)} alt="">当勾选了禁用全局环境温度后，每个罐单独输入的环境温度才会起作用，否则会被全局环境温度更新<img${ssrRenderAttr("src", _imports_0)} alt="">当勾选了从仪表读取大气压值后，在配置仪表时，勾选P2更新大气压值，本地大气压会从仪表更新 <a class="header-anchor" href="#当勾选了禁用全局环境温度后-每个罐单独输入的环境温度才会起作用-否则会被全局环境温度更新当勾选了从仪表读取大气压值后-在配置仪表时-勾选p2更新大气压值-本地大气压会从仪表更新" aria-label="Permalink to &quot;![](assets/6542174df6c91196-20261015000320-bafuiol.png)![](assets/5291123838ecf72d-20261015000319-n5whljg.gif)当勾选了禁用全局环境温度后，每个罐单独输入的环境温度才会起作用，否则会被全局环境温度更新![](assets/5291123838ecf72d-20261015000319-n5whljg.gif)当勾选了从仪表读取大气压值后，在配置仪表时，勾选P2更新大气压值，本地大气压会从仪表更新&quot;">​</a></h3></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置/4 全局实时参数.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _4_______ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _4_______ as default
};
