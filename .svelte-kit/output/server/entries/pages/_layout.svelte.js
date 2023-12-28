import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { l as locale, t as translation } from "../../chunks/i18n.js";
const app = "";
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".rainbowText.svelte-14xrgjb{color:white;-webkit-background-clip:text}.rainbowText.svelte-14xrgjb:hover{background-image:linear-gradient(\n      to right,\n      red,\n      orange,\n      yellow,\n      green,\n      rgb(255, 0, 43),\n      rgb(252, 123, 252)\n    );animation:svelte-14xrgjb-move 140s linear infinite;-webkit-text-fill-color:transparent}@keyframes svelte-14xrgjb-move{to{background-position:4500vh}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let t;
  let $$unsubscribe_locale;
  let $translation, $$unsubscribe_translation;
  let $page, $$unsubscribe_page;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_translation = subscribe(translation, (value) => $translation = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  t = $translation;
  $$unsubscribe_locale();
  $$unsubscribe_translation();
  $$unsubscribe_page();
  return `<header class="bg-gray-800 text-white"><div class="px-10"><div class="flex w-full md:flex-row justify-between h-16"><div class="flex items-center"><h4 class="text-sm"><a href="/">RG Epitaph</a></h4></div>
      <div class="hidden md:flex items-center"><div class="ml-10 flex items-center space-x-4"><p class="rainbowText svelte-14xrgjb"${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)}><a href="/">${escape(t("Header.Graveyard"))}</a></p>
          <p class="rainbowText svelte-14xrgjb"${add_attribute("aria-current", $page.url.pathname === "/about" ? "page" : void 0, 0)}><a href="/mint">${escape(t("Header.Souldraw"))}</a></p>
          <p class="rainbowText svelte-14xrgjb"${add_attribute(
    "aria-current",
    $page.url.pathname.startsWith("/ethers/set") ? "page" : void 0,
    0
  )}><a href="/connect">${escape(t("Header.Wallet"))}</a></p></div></div></div></div>
  
  <div class="${escape("hidden", true) + " md:hidden bg-gray-800"}"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a href="/" class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700">${escape(t("Header.Graveyard"))}</a>
      <a href="/mint" class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700">${escape(t("Header.Souldraw"))}</a>
      <a href="/connect" class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700">${escape(t("Header.Wallet"))}</a>
      
      </div></div>
</header>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css = {
  code: ".footer.svelte-1jrtwsf{border-top:1px solid #4cc9f0}.author-text.svelte-1jrtwsf{font-size:8px;padding-right:20px}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<footer class="flex flex-col items-center py-8 bg-black text-white footer svelte-1jrtwsf"><h3><a href="/">RG Epitaph</a></h3>
  <div class="w-full flex items-center justify-end mt-2"><h5 class="author-text  svelte-1jrtwsf"><a href="https://etherscan.io/address/0x89261878977B5a01C4fD78Fc11566aBe31BBc14e">Reapers Gambit DAO</a></h5></div>
</footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-stone-900">
  ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

  
  ${slots.default ? slots.default({}) : ``}

  
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
