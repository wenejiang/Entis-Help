import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_1$1 } from "./d0c4aff8c2a66e4c-20261015000318-d9szoxx.Dn7N54bq.js";
import { _ as _imports_3$1 } from "./77e56d33777be27a-20261015000318-veksr43.DA2Xb4it.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entismax/v4/assets/983cce899178432d-20261015000319-suxa6cu.BfMu2okQ.png";
const _imports_1 = "/entismax/v4/assets/317fca43fe051a8e-20261015000319-ii5j4w7.C-qPDZmX.png";
const _imports_3 = "/entismax/v4/assets/0dfdb6bfc80f154d-20261015000319-eni9xvg.D2jRWQLw.png";
const _imports_4 = "/entismax/v4/assets/18a0c2594bdee02e-20261015000319-pqi3lq6.Eu6LiDb3.png";
const _imports_6 = "/entismax/v4/assets/0a87bceb6fad24c8-20261015000319-qtf0800.BxJ1XpfS.png";
const __pageData = JSON.parse('{"title":"3 操作员配置","description":"","frontmatter":{"title":"3 操作员配置","date":"2026-10-14T16:03:19.000Z","lastmod":"2026-10-14T16:03:19.000Z"},"headers":[],"relativePath":"guide/1087.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置/3 操作员配置.md"}');
const _sfc_main = { name: "guide/1087.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_3-操作员配置" tabindex="-1">3 操作员配置 <a class="header-anchor" href="#_3-操作员配置" aria-label="Permalink to &quot;3 操作员配置&quot;">​</a></h1><h1 id="_3-操作员配置-1" tabindex="-1">3 操作员配置 <a class="header-anchor" href="#_3-操作员配置-1" aria-label="Permalink to &quot;3 操作员配置&quot;">​</a></h1><p>3:操作员配置</p><h1 id="操作员配置" tabindex="-1">操作员配置 <a class="header-anchor" href="#操作员配置" aria-label="Permalink to &quot;操作员配置&quot;">​</a></h1><hr><h3 id="_1-功能描述" tabindex="-1">1:功能描述： <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述：&quot;">​</a></h3><ul><li>对操作员基本信息,添加,删除,修改.</li><li>每个操作员的权限则继承自所属的岗位</li></ul><h3 id="_2-如何开始使用" tabindex="-1">2:如何开始使用： <a class="header-anchor" href="#_2-如何开始使用" aria-label="Permalink to &quot;2:如何开始使用：&quot;">​</a></h3><p>依次打开菜单,&quot;系统配置&quot;--&gt;&quot;操作员配置&quot;,如图:  <img${ssrRenderAttr("src", _imports_0)} alt="">打开后界面如下图：<img${ssrRenderAttr("src", _imports_1)} alt=""></p><h3 id="_3-操作说明" tabindex="-1">3:操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3:操作说明&quot;">​</a></h3><h5 id="添加" tabindex="-1"><img${ssrRenderAttr("src", _imports_1$1)} alt="">添加 <a class="header-anchor" href="#添加" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)添加&quot;">​</a></h5><p><img${ssrRenderAttr("src", _imports_3)} alt=""></p><h5 id="修改" tabindex="-1"><img${ssrRenderAttr("src", _imports_1$1)} alt="">修改 <a class="header-anchor" href="#修改" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)修改&quot;">​</a></h5><p>选中要修改的操作员,点击&quot;修改&quot;按钮</p><h5 id="" tabindex="-1"><img${ssrRenderAttr("src", _imports_4)} alt=""> <a class="header-anchor" href="#" aria-label="Permalink to &quot;![](assets/18a0c2594bdee02e-20261015000319-pqi3lq6.png)&quot;">​</a></h5><p><img${ssrRenderAttr("src", _imports_3$1)} alt="">操作员编号无法修改</p><h5 id="删除" tabindex="-1"><img${ssrRenderAttr("src", _imports_1$1)} alt="">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)删除&quot;">​</a></h5><p>选中要删除的操作员,点击&quot;删除&quot;按钮,显示确认对话框,点击按钮&quot;是&quot;,执行删除,点击按钮&quot;否&quot;取消删除<img${ssrRenderAttr("src", _imports_6)} alt=""><img${ssrRenderAttr("src", _imports_3$1)} alt="">在删除前必须使用修改功能,把状态修改为停止使用.否则无法删除</p><hr></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置/3 操作员配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _3______ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _3______ as default
};
