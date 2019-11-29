import { ValidationSchema, Validators } from '@lemoncode/fonk';
import {
  createFinalFormValidation,
  FinalFormValidation,
} from '@lemoncode/fonk-final-form';
import { TFunction } from 'i18next';
import { keys } from '../translations';

export const createFormValidation = (t: TFunction): FinalFormValidation => {
  Validators.required.setErrorMessage(t(keys.validations.required));

  const validationSchema: ValidationSchema = {
    field: {
      name: [Validators.required],
      email: [
        Validators.required,
        {
          validator: Validators.email,
          message: t(keys.validations.email),
        },
      ],
      landline: [
        Validators.required,
        {
          validator: Validators.pattern,
          message: t(keys.validations.phone, {
            example: '912345678',
          }),
          customArgs: { pattern: /^(9)\d{8}$/ },
        },
      ],
      mobile: [
        Validators.required,
        {
          validator: Validators.pattern,
          message: t(keys.validations.phone, {
            example: '612345678',
          }),
          customArgs: { pattern: /^(6)\d{8}$/ },
        },
      ],
    },
  };

  return createFinalFormValidation(validationSchema);
};
