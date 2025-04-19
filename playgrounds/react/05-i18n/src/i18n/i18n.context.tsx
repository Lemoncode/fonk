import React from 'react';
import type { Locale } from './i18n.vm';
import { DEFAULT_LOCALE } from './i18n.constants';

interface Context {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const I18nContext = React.createContext<Context>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<Props> = props => {
  const { children } = props;
  const [locale, setLocale] = React.useState<Locale>(DEFAULT_LOCALE);

  return <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>;
};
