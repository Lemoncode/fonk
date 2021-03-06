import React from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "./i18n";
import { languages } from "./languages";

export const LanguageContext = React.createContext(null);

export const LanguageProvider = props => {
  const { children } = props;
  const [language, setLanguage] = React.useState(languages.en);

  const i18n = React.useMemo(() => createI18n(language), []);

  const handleSetLanguage = newLanguage => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider
        value={{
          language,
          setLanguage: handleSetLanguage
        }}
      >
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};
