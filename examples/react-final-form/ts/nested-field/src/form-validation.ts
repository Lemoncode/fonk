import {
  createFormValidation,
  Validators,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    'product.name': [Validators.required.validator],
  },
};

export const formValidation = createFormValidation(validationSchema);
