import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { W as WalletSetup } from "../../../chunks/WalletSetup.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-o5nx1m_START -->${$$result.title = `<title>setProvider()</title>`, ""}<!-- HEAD_svelte-o5nx1m_END -->`, ""}



${validate_component(WalletSetup, "WalletSetup").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
