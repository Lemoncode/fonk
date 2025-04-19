import React from 'react';
import { createI18n } from './i18n';
import type { GetTranslation, Locale, Translations } from './i18n.vm';
import { I18nContext } from './i18n.context';

interface ReturnedType<Keys> {
  get: GetTranslation<Keys>;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18n = <Keys>(translations: Translations<Keys>): ReturnedType<Keys> => {
  const { locale, setLocale } = React.useContext(I18nContext);
  const i18n = React.useMemo(() => createI18n(translations, locale), [translations, locale]);

  return {
    ...i18n,
    locale,
    setLocale: locale => {
      i18n.setLocale(locale);
      setLocale(locale);
    },
  };
};
