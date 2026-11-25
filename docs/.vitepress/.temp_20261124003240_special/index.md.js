import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"EntisLNG","text":"5.0 帮助中心","tagline":"设备安装、系统配置、操作与维护一站式文档","actions":[{"theme":"brand","text":"进入文档","link":"/guide/1001.html"},{"theme":"alt","text":"安装与配置","link":"/guide/1002.html"}]},"features":[{"title":"安装与部署","details":"数据库安装、网络版部署、初始化向导与常见安装故障处理。"},{"title":"系统配置","details":"罐监控、通讯参数、Modbus / OPC 输出与系统全局设置。"},{"title":"操作与维护","details":"报表查询、罐监控操作、作业管理与数据库日常维护。"},{"title":"故障处理","details":"数据库连接异常、日志获取、系统错误与特殊应用场景。"}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
