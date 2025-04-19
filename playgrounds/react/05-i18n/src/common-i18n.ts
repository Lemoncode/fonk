import { Validators } from '@lemoncode/fonk';
import { useI18n, type Translations } from './i18n';

interface CommonValidatorTranslations {
  required: string;
  email: string;
}

const commonValidatorTranslations: Translations<CommonValidatorTranslations> = {
  en: {
    required: 'This field is required',
    email: 'Email is not valid',
  },
  es: {
    required: 'Este campo es obligatorio',
    email: 'El correo electrónico no es válido',
  },
};

export const useCommonValidators = () => {
  const { get } = useI18n(commonValidatorTranslations);
  return {
    required: ({ trim }: Validators.RequiredParams = {}) => Validators.required({ message: get('required'), trim }),
    email: () => Validators.email({ message: get('email') }),
  };
};
