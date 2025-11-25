<script>
	import { setupI18n } from "$lib/translations/index.js";
	import { _ } from "$lib/translations/index.js";
	import { browser } from "$app/environment";
	import { DEFAULT_LANGUAGE } from "../../../Config.js"; 

	// Supported languages
	const SUPPORTED_LANGUAGES = [
		{ code: "en", label: "English" },
		{ code: "ar", label: "العربية" },
		{ code: "ur", label: "اردو" },
		{ code: "fa", label: "فارسی" },
		{ code: "ps", label: "پښتو" } 
	];

	// RTL language codes
	const RTL_LANGUAGES = ["ar", "ur", "fa", "ps", "ckb", "dv", "sd", "ug", "yi"];

	let currentLanguage = DEFAULT_LANGUAGE;
	let currentDirection = RTL_LANGUAGES.includes(DEFAULT_LANGUAGE) ? "rtl" : "ltr";

	if (browser) {
		// Use saved language if it exists
		currentLanguage = localStorage.getItem("lang") || DEFAULT_LANGUAGE;
		currentDirection = RTL_LANGUAGES.includes(currentLanguage) ? "rtl" : "ltr";

		setupI18n({ withLocale: currentLanguage });
		document.documentElement.setAttribute("dir", currentDirection);
		document.documentElement.setAttribute("lang", currentLanguage);
	}

	function handleLanguageChange(event) {
		if (!browser) return;

		currentLanguage = event.target.value;
		localStorage.setItem("lang", currentLanguage);

		setupI18n({ withLocale: currentLanguage });

		currentDirection = RTL_LANGUAGES.includes(currentLanguage) ? "rtl" : "ltr";
		document.documentElement.setAttribute("dir", currentDirection);
		document.documentElement.setAttribute("lang", currentLanguage);
	}
</script>

<nav class="navbar">
	<div class="navbar-content">
		<!-- 🌐 Language Switcher Dropdown -->
		<div class="language-switcher">
			<select bind:value={currentLanguage} on:change={handleLanguageChange}>
				{#each SUPPORTED_LANGUAGES as lang}
					<option value={lang.code}>{lang.label}</option>
				{/each}
			</select>
		</div>
	</div>
</nav>

<style>
	.navbar {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 1000;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.language-switcher select {
		padding: 6px 10px;
		border-radius: 6px;
		border: 1px solid #ccc;
		font-size: 14px;
		background-color: #f9f9f9;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.language-switcher select:hover {
		border-color: #888;
		background-color: #fff;
	}

	.language-switcher option {
		padding: 6px;
	}
</style>
