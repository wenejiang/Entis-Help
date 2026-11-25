import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_2 } from "./d0c4aff8c2a66e4c-20261015000318-wd6e841.1G53O5ZT.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/7725c4449567f738-20261015000318-ken87zr.klJT2dQ9.png";
const _imports_1 = "/entislng/v5/assets/9361b04df9cb4f47-20261015000318-xk2mepb.qAl-LB7F.png";
const _imports_3 = "/entislng/v5/assets/8f0d3fbd96479c04-20261015000318-jicwrg6.CBFg8CHr.png";
const _imports_4 = "/entislng/v5/assets/c99fdf00a0a2f6c8-20261015000318-q77y9wl.CYIyq17h.png";
const _imports_5 = "/entislng/v5/assets/99604547e24e06e5-20261015000318-4sl84un.FbMf_DVx.png";
const __pageData = JSON.parse('{"title":"6 系统日志","description":"","frontmatter":{"title":"6 系统日志","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1068.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/系统操作/6 系统日志.md"}');
const _sfc_main = { name: "guide/1068.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_6-系统日志" tabindex="-1">6 系统日志 <a class="header-anchor" href="#_6-系统日志" aria-label="Permalink to &quot;6 系统日志&quot;">​</a></h1><h1 id="_6-系统日志-1" tabindex="-1">6 系统日志 <a class="header-anchor" href="#_6-系统日志-1" aria-label="Permalink to &quot;6 系统日志&quot;">​</a></h1><p>6:系统日志</p><h1 id="系统日志" tabindex="-1">系统日志 <a class="header-anchor" href="#系统日志" aria-label="Permalink to &quot;系统日志&quot;">​</a></h1><h1 id="" tabindex="-1">--- <a class="header-anchor" href="#" aria-label="Permalink to &quot;---&quot;">​</a></h1><h3 id="_1-功能描述" tabindex="-1">1:功能描述 <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述&quot;">​</a></h3><ul><li>查看相关日志,包括&quot;系统日志&quot;,&quot;业务操作&quot;日志,各功能模块的操作日志,如&quot;监控模块操作&quot;日志,如图:</li></ul><h3 id="_2-如何开始使用" tabindex="-1">2:如何开始使用 <a class="header-anchor" href="#_2-如何开始使用" aria-label="Permalink to &quot;2:如何开始使用&quot;">​</a></h3><ul><li>依次打开,&quot;系统&quot;--&gt;&quot;系统日志&quot;,如图:  <img${ssrRenderAttr("src", _imports_0)} alt=""></li><li>显示界面如下 <img${ssrRenderAttr("src", _imports_1)} alt=""></li></ul><h3 id="_3-操作说明" tabindex="-1">3:操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3:操作说明&quot;">​</a></h3><h5 id="查看日志" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">查看日志 <a class="header-anchor" href="#查看日志" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)查看日志&quot;">​</a></h5><p><img${ssrRenderAttr("src", _imports_3)} alt="">日志查看允许分页显示,在工具栏可以定位到任何一页,显示日志<img${ssrRenderAttr("src", _imports_4)} alt="">左边为日志分类,显示不同种类的日志,日志根据使用模块不同,会显示不同的分类,但系统日志是一定会存在的.</p><h5 id="日志维护" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">日志维护 <a class="header-anchor" href="#日志维护" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)日志维护&quot;">​</a></h5><p>用户可以在全局设置中设置最大日志数,超过最大日志数自动清除,否则需要用户通过数据库清理的方式来清理旧的日志记录<img${ssrRenderAttr("src", _imports_5)} alt=""></p><hr></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/系统操作/6 系统日志.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _6_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _6_____ as default
};
