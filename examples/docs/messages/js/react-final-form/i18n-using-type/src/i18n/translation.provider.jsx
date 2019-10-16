import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18n } from './i18n';
import { LanguageContext } from './language.context';

export const TranslationProvider = props => {
  const { children } = props;
  const { language } = React.useContext(LanguageContext);

  const i18n = React.useMemo(() => createI18n(language), []);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
