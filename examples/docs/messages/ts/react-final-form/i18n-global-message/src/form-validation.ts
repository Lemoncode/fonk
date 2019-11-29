import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema: ValidationSchema = {
  field: {
    user: [
      {
        validator: Validators.required,
      },
    ],
    password: [
      {
        validator: Validators.required,
      },
    ],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
