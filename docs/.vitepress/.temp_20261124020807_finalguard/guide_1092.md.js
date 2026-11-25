import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_1 } from "./d0c4aff8c2a66e4c-20261015000318-d9szoxx.D3eMWNld.js";
import { _ as _imports_3 } from "./77e56d33777be27a-20261015000318-veksr43.DKadI4dE.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/e955ab8b8f944be3-20261015000319-fddf0h9.9yvEBE-F.png";
const _imports_2 = "/entislng/v5/assets/55ba72adfca858a8-20261015000319-r5c4etu.Dt03h-be.png";
const _imports_4 = "/entislng/v5/assets/e014fd9df284e0e2-20261015000319-rxtlqmd.CJkqb4_5.png";
const _imports_5 = "/entislng/v5/assets/05d86e00688f6803-20261015000319-zf5sq3o.BuKS87E_.png";
const __pageData = JSON.parse('{"title":"8 货主配置","description":"","frontmatter":{"title":"8 货主配置","date":"2026-10-14T16:03:19.000Z","lastmod":"2026-10-14T16:03:19.000Z"},"headers":[],"relativePath":"guide/1092.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置/8 货主配置.md"}');
const _sfc_main = { name: "guide/1092.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_8-货主配置" tabindex="-1">8 货主配置 <a class="header-anchor" href="#_8-货主配置" aria-label="Permalink to &quot;8 货主配置&quot;">​</a></h1><h1 id="_8-货主配置-1" tabindex="-1">8 货主配置 <a class="header-anchor" href="#_8-货主配置-1" aria-label="Permalink to &quot;8 货主配置&quot;">​</a></h1><p>8:货主配置</p><h1 id="货主配置" tabindex="-1">货主配置 <a class="header-anchor" href="#货主配置" aria-label="Permalink to &quot;货主配置&quot;">​</a></h1><hr><h3 id="_1-功能描述" tabindex="-1">1:功能描述 <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述&quot;">​</a></h3><ul><li>对货主信息的新增,修改,删除.</li></ul><h3 id="_2-如何使用" tabindex="-1">2:如何使用： <a class="header-anchor" href="#_2-如何使用" aria-label="Permalink to &quot;2:如何使用：&quot;">​</a></h3><p>依此打开菜单&quot;系统配置&quot;=&gt; &quot;货主配置&quot;此处不管系统处于什么状态,都不需要输入操作员密码,即可打开,界面如图:<img${ssrRenderAttr("src", _imports_0)} alt=""></p><h3 id="_3-操作说明" tabindex="-1">3:操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3:操作说明&quot;">​</a></h3><h5 id="新添" tabindex="-1"><img${ssrRenderAttr("src", _imports_1)} alt="">新添 <a class="header-anchor" href="#新添" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)新添&quot;">​</a></h5><p>点击按钮&quot;新添&quot;,打开添加窗口,如图:<img${ssrRenderAttr("src", _imports_2)} alt="">  <img${ssrRenderAttr("src", _imports_3)} alt="">只有蓝底的是必填项</p><h3 id="修改" tabindex="-1"><img${ssrRenderAttr("src", _imports_1)} alt="">修改 <a class="header-anchor" href="#修改" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)修改&quot;">​</a></h3><p>选中要修改的记录,点击&quot;修改&quot;按钮,显示修改界面,如图<img${ssrRenderAttr("src", _imports_4)} alt=""><img${ssrRenderAttr("src", _imports_3)} alt="">此处,货主编号也不能修改,要使用不同的编号,请删除后新加</p><h5 id="删除" tabindex="-1"><img${ssrRenderAttr("src", _imports_1)} alt="">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-d9szoxx.gif)删除&quot;">​</a></h5><p>选中要删除的记录,点击&quot;删除&quot;按钮,显示删除确认框,如图:<img${ssrRenderAttr("src", _imports_5)} alt="">点击按钮&quot;是&quot;执行删除,点击按钮&quot;否&quot;取消删除<img${ssrRenderAttr("src", _imports_3)} alt="">要删除的记录,请先修改状态为停止使用,否则不能删除</p><hr><p><img${ssrRenderAttr("src", _imports_3)} alt="">此模块对应Entis Web的功能,如果不安装Entis Web,不需要录入此数据.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/系统配置/8 货主配置.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _8_____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _8_____ as default
};
