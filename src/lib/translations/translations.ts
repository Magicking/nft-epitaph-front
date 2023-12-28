// 'en-us' | 'zh-cn' | 'zh-tw' | 'ko-kr' | 'ja-jp' | 'ms-my' | 'th-th' | 'vi-vn' | 'es-es' | 'pt-pt'

// Define the translation keys as string literals
export type TranslationKey =
  | "Header.Graveyard"
  | "Header.Souldraw"
  | "Header.Wallet";

// Define the translations interface for each locale
export interface Translations {
  "en-US": { [key in TranslationKey]: string };
  "fr-FR": { [key in TranslationKey]: string };
}

const translations: Translations = {
  "en-US": {
    "Header.Graveyard": "Graveyard",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Wallet",
	"Hero.Welcome":"Paint your Ethernal tag on the ReaperGambit Epitaph.",
  },
  "fr-FR": {
    "Header.Graveyard": "Cimetière",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Portefeuille",
  },
};
export default translations;
