import rosetta from 'rosetta';
import type { Locale, GetTranslation, Translations } from './i18n.vm';

export interface I18n<Keys> {
  getLocale: () => Locale;
  setLocale: (locale: Locale) => void;
  get: GetTranslation<Keys>;
}

export const createI18n = <Keys>(translations: Translations<Keys>, initialLocale: Locale): I18n<Keys> => {
  const i18n = rosetta<Keys>(translations);
  i18n.locale(initialLocale);

  return {
    getLocale: () => i18n.locale() as Locale,
    setLocale: (locale: Locale) => i18n.locale(locale),
    get: (key, params) => i18n.t(key, params as any),
  };
};
