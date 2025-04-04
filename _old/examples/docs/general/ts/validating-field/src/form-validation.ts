import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [
      Validators.required,
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
