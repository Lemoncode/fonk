import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    description: [
      {
        validator: Validators.minLength,
        customArgs: { length: 10 },
        message: 'The min length is {{length}}',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
