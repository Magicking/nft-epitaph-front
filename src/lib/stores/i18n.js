import { derived, writable } from "svelte/store";
import translations from "$lib/translations/translations.ts";


// Create a writable store for the current locale
export const locale = writable("en-US");

// Get all available locales from the translations object
export const locales = Object.keys(translations);

function translate(locale, key) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	if (!key) throw new Error("no key provided to $t()");
	if (!locale) throw new Error(`no translation for key "${key}"`);
	if (!translations[locale]) throw new Error(`no translations found for ${locale}`);

	// Grab the translation from the translations object.
	let text = translations[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed-in variables in the translation string.
	// Object.keys(vars).map((k) => {
	// 	const regex = new RegExp(`{{${k}}}`, "g");
	// 	text = text.replace(regex, vars[k]);
	// });

	return text;
}

// Create a derived store that uses the current locale and translation function
export const translation = derived(
	locale,
	($locale) =>
		(key) =>
			translate($locale, key)
);
