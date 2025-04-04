import {
  Validators,
  ValidationSchema,
  createFormValidation,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    'product.name': [Validators.required],
  },
};

export const formValidation = createFormValidation(validationSchema);
