import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema = {
  field: {
    product: [
      {
        validator: Validators.required.validator,
      },
    ],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
