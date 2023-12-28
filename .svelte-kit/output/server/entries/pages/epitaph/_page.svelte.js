import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../chunks/index2.js";
import { d as defaultEvmStores, r as rgeConf, a as rgeAbi, c as contracts } from "../../../chunks/rge.abi.js";
import { p as page } from "../../../chunks/stores.js";
import { G as GraveyardStore1 } from "../../../chunks/graveyard.js";
/* empty css                                                     */const css$1 = {
  code: '.loader.svelte-126dokb.svelte-126dokb{position:relative;padding-top:100px;width:40px;margin:auto}.loader.svelte-126dokb .circle.svelte-126dokb{position:absolute;width:38px;height:38px;opacity:0;transform:rotate(225deg);animation-iteration-count:infinite;animation-name:svelte-126dokb-orbit;animation-duration:5.5s}.loader.svelte-126dokb .circle.svelte-126dokb:after{content:"";position:absolute;width:5px;height:5px;border-radius:5px;background:#fff}.loader.svelte-126dokb .circle.svelte-126dokb:nth-child(2){animation-delay:240ms}.loader.svelte-126dokb .circle.svelte-126dokb:nth-child(3){animation-delay:480ms}.loader.svelte-126dokb .circle.svelte-126dokb:nth-child(4){animation-delay:720ms}.loader.svelte-126dokb .circle.svelte-126dokb:nth-child(5){animation-delay:960ms}@keyframes svelte-126dokb-orbit{0%{transform:rotate(225deg);opacity:1;animation-timing-function:ease-out}7%{transform:rotate(345deg);animation-timing-function:linear}30%{transform:rotate(455deg);animation-timing-function:ease-in-out}39%{transform:rotate(690deg);animation-timing-function:linear}70%{transform:rotate(815deg);opacity:1;animation-timing-function:ease-out}75%{transform:rotate(945deg);animation-timing-function:ease-out}76%{transform:rotate(945deg);opacity:0}100%{transform:rotate(945deg);opacity:0}}',
  map: null
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="loader svelte-126dokb"><div class="circle svelte-126dokb"></div>
  <div class="circle svelte-126dokb"></div>
  <div class="circle svelte-126dokb"></div>
  <div class="circle svelte-126dokb"></div>
  <div class="circle svelte-126dokb"></div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".okayText.svelte-1u8xu4y{color:#00ff00}.dangerText.svelte-1u8xu4y{color:#ff0000}.technoText.svelte-1u8xu4y{color:#4cc9f0}p.svelte-1u8xu4y{font-size:12px;font-weight:400}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_GraveyardStore1;
  let $$unsubscribe_contracts;
  let $$unsubscribe_page;
  $$unsubscribe_GraveyardStore1 = subscribe(GraveyardStore1, (value) => value);
  $$unsubscribe_contracts = subscribe(contracts, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  defaultEvmStores.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  $$result.css.add(css);
  $$unsubscribe_GraveyardStore1();
  $$unsubscribe_contracts();
  $$unsubscribe_page();
  return `<div>${`${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}
</div>`;
});
export {
  Page as default
};
