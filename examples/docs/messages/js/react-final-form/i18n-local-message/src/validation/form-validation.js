import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { keys } from '../translations';

export const createLoginValidation = t => {
  const validationSchema = {
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
