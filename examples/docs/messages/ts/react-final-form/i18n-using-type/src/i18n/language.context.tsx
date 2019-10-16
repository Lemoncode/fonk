import React from 'react';
import { languages } from './languages';

export const LanguageContext = React.createContext(null);

export const LanguageProvider: React.FunctionComponent = props => {
  const { children } = props;
  const [language, setLanguage] = React.useState(languages.en);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
