import { ValidationSchema, Validators } from '@lemoncode/fonk';
import {
  createFinalFormValidation,
  FinalFormValidation,
} from '@lemoncode/fonk-final-form';
import { TFunction } from 'i18next';
import { keys } from '../translations';

export const createLoginValidation = (t: TFunction): FinalFormValidation => {
  const validationSchema: ValidationSchema = {
    field: {
      user: [
        {
          validator: Validators.required,
          message: t(keys.required),
        },
      ],
      password: [
        {
          validator: Validators.required,
          message: t(keys.required),
        },
      ],
    },
  };

  return createFinalFormValidation(validationSchema);
};
