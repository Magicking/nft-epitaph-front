// 'en-us' | 'zh-cn' | 'zh-tw' | 'ko-kr' | 'ja-jp' | 'ms-my' | 'th-th' | 'vi-vn' | 'es-es' | 'pt-pt'

// Define the translation keys as string literals
export type TranslationKey =
  | "Header.Graveyard"
  | "Header.Souldraw"
  | "Header.Wallet";

// Define the translations interface for each locale
export interface Translations {
  "en-us": { [key in TranslationKey]: string };
  "fr-FR": { [key in TranslationKey]: string };
}

const translations: Translations = {
  "en-us": {
    "Header.Graveyard": "Graveyard",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Wallet",
  },
  "fr-FR": {
    "Header.Graveyard": "Cimetière",
    "Header.Souldraw": "Souldraw",
    "Header.Wallet": "Portefeuille",
  },
};
export default translations;
