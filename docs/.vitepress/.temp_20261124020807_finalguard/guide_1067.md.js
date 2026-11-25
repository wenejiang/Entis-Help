import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { _ as _imports_2 } from "./d0c4aff8c2a66e4c-20261015000318-wd6e841.1G53O5ZT.js";
import { _ as _imports_3 } from "./5291123838ecf72d-20261015000318-tsue9gl.DsnhMa8j.js";
import { _ as _imports_8 } from "./77e56d33777be27a-20261015000318-n29j064.W9amo972.js";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/entislng/v5/assets/4c0c969ec450c24f-20261015000318-rtg1u9q.z84oTdu-.png";
const _imports_1 = "/entislng/v5/assets/76681e12fd356c24-20261015000318-mirvuh4.BeiLiXgM.png";
const _imports_4 = "/entislng/v5/assets/8ff19889b9394584-20261015000318-vzh6aaa.DocJgWOV.png";
const _imports_5 = "/entislng/v5/assets/1834fbe7f9616fc8-20261015000318-k9zuen3.B3fqcfV1.png";
const _imports_6 = "/entislng/v5/assets/c7e5db74a896720d-20261015000318-7iddbkx.CVPwdN5c.png";
const _imports_7 = "/entislng/v5/assets/d3b1ef45b846cb01-20261015000318-ww7qcck.3bx48leI.png";
const __pageData = JSON.parse('{"title":"5 数据库清理","description":"","frontmatter":{"title":"5 数据库清理","date":"2026-10-14T16:03:18.000Z","lastmod":"2026-10-14T16:03:18.000Z"},"headers":[],"relativePath":"guide/1067.md","filePath":"guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/系统操作/5 数据库清理.md"}');
const _sfc_main = { name: "guide/1067.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_5-数据库清理" tabindex="-1">5 数据库清理 <a class="header-anchor" href="#_5-数据库清理" aria-label="Permalink to &quot;5 数据库清理&quot;">​</a></h1><h1 id="_5-数据库清理-1" tabindex="-1">5 数据库清理 <a class="header-anchor" href="#_5-数据库清理-1" aria-label="Permalink to &quot;5 数据库清理&quot;">​</a></h1><p>5:数据库清理</p><h1 id="数据库清理" tabindex="-1">数据库清理 <a class="header-anchor" href="#数据库清理" aria-label="Permalink to &quot;数据库清理&quot;">​</a></h1><h1 id="" tabindex="-1">--- <a class="header-anchor" href="#" aria-label="Permalink to &quot;---&quot;">​</a></h1><h3 id="_1-功能描述" tabindex="-1">1:功能描述 <a class="header-anchor" href="#_1-功能描述" aria-label="Permalink to &quot;1:功能描述&quot;">​</a></h3><ul><li>清除指定时间内的日志数据，业务数据，报警记录等</li><li>配置数据不会被清理.</li></ul><h3 id="_2-如何开始使用" tabindex="-1">2:如何开始使用 <a class="header-anchor" href="#_2-如何开始使用" aria-label="Permalink to &quot;2:如何开始使用&quot;">​</a></h3><ul><li>依次打开菜单&quot;系统&quot;--&gt;&quot;数据库清理&quot;,如图:</li></ul><p><img${ssrRenderAttr("src", _imports_0)} alt=""> 显示清理界面<img${ssrRenderAttr("src", _imports_1)} alt=""></p><h3 id="_3-操作说明" tabindex="-1">3:操作说明 <a class="header-anchor" href="#_3-操作说明" aria-label="Permalink to &quot;3:操作说明&quot;">​</a></h3><h5 id="容量提醒" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">容量提醒 <a class="header-anchor" href="#容量提醒" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)容量提醒&quot;">​</a></h5><p>界面会显示当前数据库大小和容量提醒大小,当数据库大小超过此设定值时,系统会提示进行数据库清理</p><h5 id="清理数据" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">清理数据 <a class="header-anchor" href="#清理数据" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)清理数据&quot;">​</a></h5><p><img${ssrRenderAttr("src", _imports_3)} alt="">点击按钮&quot;立即删除超期数据&quot;,会显示如下确认窗体,此清理时间点计算依据为当前时间倒算指定月份的时间,例子中为12个月，在此时间点之前的数据将被清除掉.</p><p><img${ssrRenderAttr("src", _imports_4)} alt=""></p><p><img${ssrRenderAttr("src", _imports_3)} alt="">点击确认按钮以后,还将弹出密码框,输入当前操作员的密码后才会开始执行清除.</p><p><img${ssrRenderAttr("src", _imports_3)} alt="">根据清除数据量的大小不同,等待时间不一样,但一般会较长,至少在5分种以上.请耐心等待.直到弹出完成对话框</p><p><img${ssrRenderAttr("src", _imports_5)} alt=""></p><p><img${ssrRenderAttr("src", _imports_3)} alt="">表示历史数据已清理完毕,但在执行数据库清理以后,数据库的大小并没有减少,可能还会增加一点,这是因为数据虽然被标记为删除,但实际占用空间并未被释放,而且由于清理所导致的日志数据量的增加,而使得数据库的实际大小不减反增.</p><h5 id="完全清空历史数据" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">完全清空历史数据 <a class="header-anchor" href="#完全清空历史数据" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)完全清空历史数据&quot;">​</a></h5><p>在一些特殊情况下，系统变得缓慢，历史数据也非常多，无法快速清除所有历史数据，此时可以通过此功能来清除所有历史数据，提高系统执行效率，在执行此功能前，强烈建议先执行备份数据库</p><h5 id="空间回收" tabindex="-1"><img${ssrRenderAttr("src", _imports_2)} alt="">空间回收 <a class="header-anchor" href="#空间回收" aria-label="Permalink to &quot;![](assets/d0c4aff8c2a66e4c-20261015000318-wd6e841.gif)空间回收&quot;">​</a></h5><p>点击按钮&quot;手动收缩&quot;,会弹出确认提示框,确认后开始执行空间回收,根据数据量不同,时间也不同,但一般会比较快,在1分钟之内,请稍等即可.</p><p><img${ssrRenderAttr("src", _imports_6)} alt=""></p><p>弹出完成对话框,表示空间回收完成.</p><p><img${ssrRenderAttr("src", _imports_7)} alt=""></p><p><img${ssrRenderAttr("src", _imports_8)} alt="">一般情况下，数据库会自动收缩并回收已删除数据的空间，但会合理保留部份空间备用，所以没有特殊情况，无需手动收缩</p><hr></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/EntisMAXIV/EntisMaxIV帮助文档/管理维护说明/系统操作/5 数据库清理.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _5______ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  _5______ as default
};
