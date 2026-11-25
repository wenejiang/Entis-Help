import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/08bf96864f3543ef-20261015000318-bjb9yr7.DzVNDVzg.png";
const _imports_1 = "/entislng/v5/assets/13f712817ef063e6-20261015000318-6lhcvf0.alEwIzbt.png";
const _imports_2 = "/entislng/v5/assets/d0c4aff8c2a66e4c-20261015000316-psvn3jr.1VVVwdrO.gif";
const _imports_3 = "/entislng/v5/assets/a8532425eaf36491-20261015000318-i21oors.C8qz_94f.png";
const __pageData = JSON.parse('{"title":"使用软件计算Hims密度功能","description":"","frontmatter":{"title":"使用软件计算Hims密度功能","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1102.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/HIMS密度计算/使用软件计算Hims密度功能.md"}');
const _sfc_main = { name: "guide/1102.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="使用软件计算hims密度功能" tabindex="-1">使用软件计算Hims密度功能 <a class="header-anchor" href="#使用软件计算hims密度功能" aria-label="Permalink to &quot;使用软件计算Hims密度功能&quot;">​</a></h1><h1 id="使用软件计算hims密度功能-1" tabindex="-1">使用软件计算Hims密度功能 <a class="header-anchor" href="#使用软件计算hims密度功能-1" aria-label="Permalink to &quot;使用软件计算Hims密度功能&quot;">​</a></h1><p>使用软件计算Hims密度功能 Entis MAX4.2.22.422版本推出了Hims密度计算功能，可以替代液位计上面的Hims密度计算功能，下面就介绍一下配置和使用方法</p><h5 id="第一步-在仪表配置中开启hims密度计算功能" tabindex="-1">第一步，在仪表配置中开启Hims密度计算功能 <a class="header-anchor" href="#第一步-在仪表配置中开启hims密度计算功能" aria-label="Permalink to &quot;第一步，在仪表配置中开启Hims密度计算功能&quot;">​</a></h5><p>通过主菜单，罐监控配置\\仪表配置,进入仪表配置界面，然后，选择仪表，在右边的配置项中，勾上项【罐底压力(P1)计算密度】,如下图：<img${ssrRenderAttr("src", _imports_0)} alt=""></p><h5 id="第二步-配置详细的hims密度计算参数" tabindex="-1">第二步，配置详细的Hims密度计算参数 <a class="header-anchor" href="#第二步-配置详细的hims密度计算参数" aria-label="Permalink to &quot;第二步，配置详细的Hims密度计算参数&quot;">​</a></h5><p>开启计算选项后，点击边上的【计算参数配置】按钮，进入具体参数配置界面，如下图：<img${ssrRenderAttr("src", _imports_1)} alt=""><img${ssrRenderAttr("src", _imports_2)} alt="">此处以修正值结尾的项都是一个固定修正值，一般置0即可，可以认为是在对应项上作加法，输入负值，相当于作减法<img${ssrRenderAttr("src", _imports_2)} alt="">如果对密度精度要求不高，可以采用简化方案，去掉项【使用完整计算方案】，这样【完整计算部份参数】的项会被禁用，简化了参数配置的要求，<em>简化方案等同于旧版本中的压力计算密度功能</em><img${ssrRenderAttr("src", _imports_2)} alt="">此处的项为一次性配置，没什么特殊情况，配置一次即可</p><h5 id="第三步-如果要使用软件计算密度作为视密度计算标准密度-请在罐实时参数设置中-开启2个选项" tabindex="-1">第三步，如果要使用软件计算密度作为视密度计算标准密度，请在罐实时参数设置中，开启2个选项 <a class="header-anchor" href="#第三步-如果要使用软件计算密度作为视密度计算标准密度-请在罐实时参数设置中-开启2个选项" aria-label="Permalink to &quot;第三步，如果要使用软件计算密度作为视密度计算标准密度，请在罐实时参数设置中，开启2个选项&quot;">​</a></h5><p>1：勾选读取密度设备时自动转换标准密度2：勾选标准密度来源中的其他测量密度<img${ssrRenderAttr("src", _imports_3)} alt=""></p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/特殊应用说明/HIMS密度计算/使用软件计算Hims密度功能.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ______Hims____ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  ______Hims____ as default
};
