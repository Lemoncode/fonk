import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from './i18n';
import { createLoginValidation } from './form-validation';

export const useValidation = () => {
  const { language } = React.useContext(LanguageContext);
  const { t } = useTranslation();

  const formValidation = React.useMemo(() => {
    return createLoginValidation(t);
  }, [language]);

  return { formValidation };
};
