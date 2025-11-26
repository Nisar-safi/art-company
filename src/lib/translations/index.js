import { dictionary, locale, _, init } from "svelte-i18n";

// Import all language files
import * as english from "./en/en.json";
import * as arabic from "./ar/ar.json";
import * as urdu from "./ur/ur.json";
import * as farsi from "./fa/fa.json";
import * as pashto from "./ps/ps.json";
init({
  fallbackLocale: "en",
  initialLocale: "en"
});
// ✅ Initialize i18n dictionary
function setupI18n({ withLocale: _locale } = { withLocale: "en" }) {
	dictionary.set({
		en: english,
		ar: arabic,
		ur: urdu,
		fa: farsi,
		ps: pashto
	});

	locale.set(_locale);
}

export { _, setupI18n };
