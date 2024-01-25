// 'en-us' | 'zh-cn' | 'zh-tw' | 'ko-kr' | 'ja-jp' | 'ms-my' | 'th-th' | 'vi-vn' | 'es-es' | 'pt-pt'

// Define the translation keys as string literals
export type TranslationKey =
  | "Header.Graveyard"
  | "Header.Souldraw"
  | "Header.SouldrawNym"
  | "Hero.Welcome"
  | "Mint.Tooltip"
  | "Mint.Save"
  | "Mint.Banner"
  | "Mint.BannerNym"
  | "Header.Wallet";

// Define the translations interface for each locale
export interface Translations {
  "en-US": { [key in TranslationKey]: string };
  "fr-FR": { [key in TranslationKey]: string };
}

const translations: Translations = {
  "en-US": {
    "Header.Graveyard": "Graveyard",
    "Header.Souldraw": "Souldraw (eth)",
    "Header.SouldrawNym": "Souldraw (nym)",
    "Header.Wallet": "Wallet",
    "Mint.Tooltip": "Reapers Gambit account to honor",
    "Mint.Banner": "Draw your message on the canvas below, it will be stored on the Ethereum blockchain ethernarly. Use the erase button bellow to erase pixel.",
    "Mint.BannerNym": "Use the NYM Mixnet to anonymously draw your message on the canvas below, it will be stored on the Ethereum blockchain ethernarly. Use the erase button bellow to erase pixel.",
    "Mint.Save": "Save",
	  "Hero.Welcome":"Paint your graffiti on-chain.",
  },
  "fr-FR": {
    "Header.Graveyard": "Cimetière",
    "Header.Souldraw": "Souldraw",
    "Header.SouldrawNym": "Souldraw (nym)",
    "Header.Wallet": "Portefeuille",
    "Mint.Tooltip": "Compte Reapers Gambit à honorer",
    "Mint.Banner": "",
    "Mint.BannerNym": "",
    "Mint.Save": "Enregistrer",
    "Hero.Welcome": "Peignez votre tag Ethernal sur l'épitaphe ReaperGambit.",
  },
};
export default translations;
