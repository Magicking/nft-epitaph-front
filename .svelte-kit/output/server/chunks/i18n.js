import { d as derived, w as writable } from "./index.js";
const translations = {
  "en-US": {
    "Header.Graveyard": "Graveyard",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Wallet",
    "Hero.Welcome": "Paint your Ethernal tag on the ReaperGambit Epitaph."
  },
  "fr-FR": {
    "Header.Graveyard": "Cimetière",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Portefeuille"
  }
};
const locale = writable("en-US");
function translate(locale2, key) {
  if (!key)
    throw new Error("no key provided to $t()");
  if (!locale2)
    throw new Error(`no translation for key "${key}"`);
  if (!translations[locale2])
    throw new Error(`no translations found for ${locale2}`);
  let text = translations[locale2][key];
  if (!text)
    throw new Error(`no translation found for ${locale2}.${key}`);
  return text;
}
const translation = derived(
  locale,
  ($locale) => (key) => translate($locale, key)
);
export {
  locale as l,
  translation as t
};
