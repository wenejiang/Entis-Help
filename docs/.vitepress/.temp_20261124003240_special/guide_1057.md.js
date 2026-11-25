import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/b959fb6b5db7a8ab-20261015000318-g2zz6jk.BT6YCVg2.png";
const _imports_1 = "/entislng/v5/assets/dcde98295919c1e7-20261015000318-yxq655q.Bmy8uCu6.gif";
const __pageData = JSON.parse('{"title":"1 数据库连接错误处理","description":"","frontmatter":{"title":"1 数据库连接错误处理","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1057.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/错误处理/1 数据库连接错误处理.md"}');
const _sfc_main = { name: "guide/1057.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_1-数据库连接错误处理" tabindex="-1">1 数据库连接错误处理 <a class="header-anchor" href="#_1-数据库连接错误处理" aria-label="Permalink to &quot;1 数据库连接错误处理&quot;">​</a></h1><h1 id="_1-数据库连接错误处理-1" tabindex="-1">1 数据库连接错误处理 <a class="header-anchor" href="#_1-数据库连接错误处理-1" aria-label="Permalink to &quot;1 数据库连接错误处理&quot;">​</a></h1><p>1:数据库连接错误处理</p><h1 id="数据库连接错误处理" tabindex="-1">数据库连接错误处理 <a class="header-anchor" href="#数据库连接错误处理" aria-label="Permalink to &quot;数据库连接错误处理&quot;">​</a></h1><p>1:打开Entis Max软件,在启动界面停顿了一分钟左右,然后显示如下错误框<img${ssrRenderAttr("src", _imports_0)} alt=""><img${ssrRenderAttr("src", _imports_1)} alt="">请选择按钮&quot;是&quot;,重新设置数据库连接,会显示数据库连接设置界面,数据库连接设置界面,请参考EntisMax软件安装说明中的初始化设置向导说明中的数据库连接设定</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/错误处理/1 数据库连接错误处理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _1__________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _1__________ as default
};
