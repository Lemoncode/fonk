import {
  Validators,
  ValidationSchema,
  createFormValidation,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    product: [
      {
        validator: Validators.required,
        message: 'My custom error message',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
