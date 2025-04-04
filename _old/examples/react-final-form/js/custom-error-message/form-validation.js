import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema = {
  field: {
    product: [
      {
        validator: Validators.required,
        message: 'My custom error message',
      },
    ],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
