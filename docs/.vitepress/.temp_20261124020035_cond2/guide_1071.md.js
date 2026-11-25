import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0$1 } from "./5291123838ecf72d-20261015000319-n5whljg.BkkP8UAO.js";
import { _ as _imports_3$1 } from "./d0c4aff8c2a66e4c-20261015000319-bfojtws.CsIcZs8j.js";
import { _ as _imports_8$1 } from "./77e56d33777be27a-20261015000319-ahme7j8.DrXopHw0.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entismax/v4/assets/b2f7c8f511608083-20261015000319-icj54kw.5ksXC30M.png";
const _imports_2 = "/entismax/v4/assets/b471d6948b34ce7f-20261015000319-y1zp8ky.P-HaAKwB.png";
const _imports_3 = "/entismax/v4/assets/727cabfbe1bc760c-20261015000319-fl2xgay.BQkG_nQN.png";
const _imports_5 = "/entismax/v4/assets/90739dbb48a7f8d4-20261015000319-yk8mbcf.B5ftI5n9.png";
const _imports_7 = "/entismax/v4/assets/5689edf9f03a06ba-20261015000319-6fdmfkk.DI0Vuuig.png";
const _imports_8 = "/entismax/v4/assets/c4cb6d56606ec293-20261015000319-0yzg8k7.CzBfYZlx.png";
const __pageData = JSON.parse('{"title":"1 通讯配置","description":"","frontmatter":{"title":"1 通讯配置","date":"2026-10-14T16:03:19.000Z","lastmod":"2026-10-14T16:03:19.000Z"},"headers":[],"relativePath":"guide/1071.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置/1 通讯配置.md"}');
const _sfc_main = { name: "guide/1071.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_1-通讯配置" tabindex="-1">1 通讯配置 <a class="header-anchor" href="#_1-通讯配置" aria-label="Permalink to &quot;1 通讯配置&quot;">​</a></h1><h1 id="_1-通讯配置-1" tabindex="-1">1 通讯配置 <a class="header-anchor" href="#_1-通讯配置-1" aria-label="Permalink to &quot;1 通讯配置&quot;">​</a></h1><p>1:通讯配置</p><h1 id="通讯配置" tabindex="-1">通讯配置 <a class="header-anchor" href="#通讯配置" aria-label="Permalink to &quot;通讯配置&quot;">​</a></h1><h1 id="" tabindex="-1">--- <a class="header-anchor" href="#" aria-label="Permalink to &quot;---&quot;">​</a></h1><h3 id="_1-功能描述" tabindex="-1">1:功能描述 <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述&quot;">​</a></h3><ul><li>配置通讯相关信息的增,改,删.</li></ul><h3 id="_2-如何使用" tabindex="-1">2:如何使用： <a class="header-anchor" href="#_2-如何使用" aria-label="Permalink to &quot;2:如何使用：&quot;">​</a></h3><p>依次打开菜单&quot;罐监控配置&quot; --&gt; &quot;通讯配置&quot; 如图: <img${ssrRenderAttr("src", _imports_0)} alt="">    <img${ssrRenderAttr("src", _imports_0$1)} alt="">如系统处于正常监控运行状态,需要验证当前操作员密码,才能进入<img${ssrRenderAttr("src", _imports_2)} alt=""><img${ssrRenderAttr("src", _imports_0$1)} alt="">显示界面如下:<img${ssrRenderAttr("src", _imports_3)} alt=""></p><h3 id="_3-操作说明" tabindex="-1">3:操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3:操作说明&quot;">​</a></h3><h5 id="添加新通讯" tabindex="-1"><img${ssrRenderAttr("src", _imports_3$1)} alt="">添加新通讯 <a class="header-anchor" href="#添加新通讯" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000319-bfojtws.gif)添加新通讯&quot;">​</a></h5><p><img${ssrRenderAttr("src", _imports_0$1)} alt="">点击&quot;添加&quot;按钮,<img${ssrRenderAttr("src", _imports_5)} alt="">可以选择硬件类型是串口还是网卡,如果是网卡,则一般都是TCP类的通讯协议<img${ssrRenderAttr("src", _imports_8$1)} alt="">有些设备能通过网卡模拟串口,如是这种情况,也请选择串口<img${ssrRenderAttr("src", _imports_0$1)} alt="">输入要命名的名称后,点击确认,新的通讯模块已添加,但还需要您再配置详细的数据.:<img${ssrRenderAttr("src", _imports_0$1)} alt="">串口类的设备的配置项,如图:<img${ssrRenderAttr("src", _imports_7)} alt=""> 网卡类设备的配置项,如图:<img${ssrRenderAttr("src", _imports_8)} alt=""></p><hr></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/罐监控配置/1 通讯配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _1_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _1_____ as default
};
