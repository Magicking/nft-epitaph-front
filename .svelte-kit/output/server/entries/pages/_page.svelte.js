import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component, i as is_promise, n as noop, d as each, b as add_attribute } from "../../chunks/index2.js";
import { c as contracts, d as defaultEvmStores, r as rgeConf, a as rgeAbi, b as connected, e as chainId } from "../../chunks/rge.abi.js";
import { l as locale, t as translation } from "../../chunks/i18n.js";
import { W as WalletSetup, i as init } from "../../chunks/WalletSetup.js";
import { G as GraveyardStore1 } from "../../chunks/graveyard.js";
import "bowser";
import "joi";
import "@web3-onboard/common";
import "bignumber.js";
import "lodash.partition";
import "lodash.merge";
import "eventemitter3";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
const Hero_svelte_svelte_type_style_lang = "";
const css = {
  code: ".epitaph.svelte-i62unr:hover{color:#fff;cursor:pointer;text-shadow:0 0 10px #fff,\n      /* First layer of shadow */ 0 0 5px rgba(85, 255, 0, 0.6),\n      /* Second layer */ 0 0 10px rgba(85, 255, 0, 0.6),\n      /* Third layer */ 0 0 20px rgba(85, 255, 0, 0.6),\n      /* Fourth layer */ 0 0 25px rgba(85, 255, 0, 0.6),\n      /* Fifth layer */ 0 0 80px rgba(85, 255, 0, 0.6);border-radius:10px;transition:box-shadow 0.3s ease}",
  map: null
};
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let t;
  let $$unsubscribe_locale;
  let $translation, $$unsubscribe_translation;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_translation = subscribe(translation, (value) => $translation = value);
  $$result.css.add(css);
  t = $translation;
  $$unsubscribe_locale();
  $$unsubscribe_translation();
  return `<section class="h-[90vh] bg-black"><div class="flex items-center p-5 h-full w-full justify-between"><div class="flex-1 flex items-center justify-center"><div class="md:min-w-[34rem]"><h1 class="text-5xl text-white mb-2 flex flex-col md:items-center justify-center items-start">Reaper Gambit <br>
          <span class="text-brightGreen epitaph svelte-i62unr">Epitaph</span></h1>
        <h2 class="text-lg text-white md:min-w-[30rem] sm:text-start md:text-center">${escape(t("Hero.Welcome"))}<br></h2>
        <div class="flex mt-10 w-56 flex items-center justify-center w-full">${validate_component(WalletSetup, "WalletSetup").$$render($$result, {}, {}, {})}</div></div></div></div>
</section>`;
});
function* iter_range(begin, end, step) {
  step = step ? step : 1;
  if (typeof end === "undefined") {
    end = begin > 0 ? begin : 0;
    begin = begin < 0 ? begin : 0;
  }
  if (begin == end) {
    return;
  }
  if (begin > end) {
    step = step * -1;
  }
  for (let x = begin; x < end; x += step) {
    yield x;
  }
}
function range(begin, end, step) {
  if (begin < 0)
    begin = 0;
  return Array.from(iter_range(begin, end, step));
}
const Graveyard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $contracts, $$unsubscribe_contracts;
  let $GraveyardStore1, $$unsubscribe_GraveyardStore1;
  $$unsubscribe_contracts = subscribe(contracts, (value) => $contracts = value);
  $$unsubscribe_GraveyardStore1 = subscribe(GraveyardStore1, (value) => $GraveyardStore1 = value);
  defaultEvmStores.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  $$unsubscribe_contracts();
  $$unsubscribe_GraveyardStore1();
  return `<div class="min-h-screen">${$contracts.rge ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
      <h1 class="text-white text-center h-56">Loading...
      </h1>
    `;
    }
    return function(totalSupply) {
      return `
      <div class="flex flex-col items-evenly justify-evenly min-h-[90vh]"><p class="py-4 text-white text-center text-3xl">Total ${escape(totalSupply)}</p>
        ${each(range(totalSupply - 5, totalSupply - 0, 1), (tokenId) => {
        return `${tokenId >= 0 && tokenId < totalSupply && $GraveyardStore1[tokenId] ? `<div class="px-4 mt-2"><p class="text-white text-xl pl-10">ID: ${escape(tokenId)}</p>
              <a href="${"/epitaph/?i=" + escape(tokenId, true)}"><img class="pxl justify-center items-center mx-auto my-4" alt="NFT"${add_attribute("src", $GraveyardStore1[tokenId].image, 0)}></a>
            </div>` : ``}`;
      })}</div>
    `;
    }(__value);
  }($contracts.rge.totalSupply())}` : ``}</div>`;
});
const injected = injectedModule();
const wcV2InitOptions = {
  projectId: "550b3382ab70a46838a0f1659b4aef43",
  requiredChains: [1],
  dappUrl: "https://rge.6120.eu/"
};
const walletConnect = walletConnectModule(wcV2InitOptions);
init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://eth.llamarpc.com"
    }
  ],
  appMetadata: {
    name: "NFT EPITAPH",
    description: "Research tokens smarter and faster.",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "WalletConnect", url: "https://walletconnect.com/" }
    ]
  },
  accountCenter: {
    desktop: { enabled: false, position: "topRight" },
    mobile: { enabled: false, position: "topRight" }
  }
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $connected, $$unsubscribe_connected;
  let $chainId, $$unsubscribe_chainId;
  $$unsubscribe_connected = subscribe(connected, (value) => $connected = value);
  $$unsubscribe_chainId = subscribe(chainId, (value) => $chainId = value);
  $$unsubscribe_connected();
  $$unsubscribe_chainId();
  return `${$$result.head += `<!-- HEAD_svelte-1t31otj_START -->${$$result.title = `<title>RG Epitaph</title>`, ""}<meta name="description" content="RG Epitaph"><!-- HEAD_svelte-1t31otj_END -->`, ""}

<div>${$connected ? `${$chainId !== 1 ? `TODO: Warning not on Ethereum Mainnet` : `${validate_component(Graveyard, "Graveyard").$$render($$result, {}, {}, {})}`}` : `${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}`}</div>`;
});
export {
  Page as default
};
