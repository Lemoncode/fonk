import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema = {
  field: {
    'product.name': [Validators.required],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
