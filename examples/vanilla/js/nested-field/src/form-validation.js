import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    'product.name': [Validators.required],
  },
};

export const formValidation = createFormValidation(validationSchema);
