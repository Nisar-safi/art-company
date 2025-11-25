import { setupI18n } from "$lib/translations/index.js";
export const load = async () => {
    setupI18n({ withLocale: 'ar' });
    return {};
};
