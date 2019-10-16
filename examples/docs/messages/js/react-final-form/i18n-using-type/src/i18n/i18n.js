import i18next from 'i18next';
import { languages } from './languages';
import { translations } from '../translations';

export const createI18n = language => {
  const i18n = i18next.createInstance();

  i18n.init({
    lng: language,
    fallbackLng: language,
    resources: {
      [languages.en]: {
        translation: {
          ...translations.en,
        },
      },
      [languages.es]: {
        translation: {
          ...translations.es,
        },
      },
    },
  });

  return i18n;
};
