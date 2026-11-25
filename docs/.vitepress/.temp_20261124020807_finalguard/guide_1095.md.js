import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_0 } from "./821bab51ec2ee303-20261015000318-3ghmuyw.DilcirRz.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_1 = "/entislng/v5/assets/12884874963fab07-20261015000318-mhjffhf.BC97fopD.png";
const _imports_2 = "/entislng/v5/assets/b23095d48e59a6d9-20261015000318-vfyxv39.DwdC5ym0.png";
const _imports_3 = "/entislng/v5/assets/4abdc1c4995582eb-20261015000318-i6b242k.cDV76a9Y.png";
const _imports_4 = "/entislng/v5/assets/5533aa3080a01388-20261015000318-3i2sy6e.C02LsjQY.png";
const __pageData = JSON.parse('{"title":"CIU888Modbus多点温度配置说明","description":"","frontmatter":{"title":"CIU888Modbus多点温度配置说明","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1095.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/CIU888Modbus配置说明/CIU888Modbus多点温度配置说明.md"}');
const _sfc_main = { name: "guide/1095.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ciu888modbus多点温度配置说明" tabindex="-1">CIU888Modbus多点温度配置说明 <a class="header-anchor" href="#ciu888modbus多点温度配置说明" aria-label="Permalink to &quot;CIU888Modbus多点温度配置说明&quot;">​</a></h1><h1 id="ciu888modbus多点温度配置说明-1" tabindex="-1">CIU888Modbus多点温度配置说明 <a class="header-anchor" href="#ciu888modbus多点温度配置说明-1" aria-label="Permalink to &quot;CIU888Modbus多点温度配置说明&quot;">​</a></h1><p>CIU888Modbus多点温度配置说明</p><h3 id="ciu888modbus多点温度配置说明-2" tabindex="-1">CIU888Modbus多点温度配置说明 <a class="header-anchor" href="#ciu888modbus多点温度配置说明-2" aria-label="Permalink to &quot;CIU888Modbus多点温度配置说明&quot;">​</a></h3><hr><h5 id="配置第一步" tabindex="-1">配置第一步 <a class="header-anchor" href="#配置第一步" aria-label="Permalink to &quot;配置第一步&quot;">​</a></h5><p>在通讯配置模块中找到CIU参数配置选择,然后选择CIU类型为CIU888,然后，边上的配置按钮就会变为可用状态，如下图 <img${ssrRenderAttr("src", _imports_0)} alt="">数据地址位起始项，建议选择0，这样与CIU中地址一致，不用加1转换</p><p>配置第二步 在此处设置CIU中的多点温度数据区参数，多点温度启始位请参考基准值，在20000或与20001中调整，<img${ssrRenderAttr("src", _imports_1)} alt="">此处的配置值主要使用在仪表配置中，多点温度配置向导计算实际地址时使用</p><h5 id="配置第三步" tabindex="-1">配置第三步 <a class="header-anchor" href="#配置第三步" aria-label="Permalink to &quot;配置第三步&quot;">​</a></h5><p>进入仪表配置中，选择要配置伺服密度的仪表,此仪表请确认是关联在刚才配置的通讯协议下面，选择此仪表后，界面会显示如下： <img${ssrRenderAttr("src", _imports_2)} alt=""> 在此界面，点击按钮【多点温度配置向导】</p><h5 id="配置第四步" tabindex="-1">配置第四步 <a class="header-anchor" href="#配置第四步" aria-label="Permalink to &quot;配置第四步&quot;">​</a></h5><p>进入配置向导界面，各界面如下<img${ssrRenderAttr("src", _imports_3)} alt=""> 最后，会根据相关设置项，生成多点温度所需相关配置项,如下图：<img${ssrRenderAttr("src", _imports_4)} alt=""> 点击完成后，将在modbus配置表中加入新的配置项</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/配置说明/CIU888Modbus配置说明/CIU888Modbus多点温度配置说明.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CIU888Modbus________ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  CIU888Modbus________ as default
};
