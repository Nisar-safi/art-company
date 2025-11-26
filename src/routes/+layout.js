// src/routes/+layout.js
import { setupI18n } from "$lib/translations/index.js";
import { browser } from "$app/environment";
import { DEFAULT_LANGUAGE } from "../../Config.js";

export const load = async () => {
	// Only run in browser
	if (browser) {
		const savedLang = localStorage.getItem("lang");
		const localeToUse = savedLang || DEFAULT_LANGUAGE; 

		setupI18n({ withLocale: localeToUse });

		// Apply dir="rtl" or "ltr" immediately
		const isRtl = ["ar", "ur", "fa", "ps"].includes(localeToUse);
		document.documentElement.dir = isRtl ? "rtl" : "ltr";
		document.documentElement.lang = localeToUse;
	}

	return {};
};