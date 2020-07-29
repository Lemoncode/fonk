import { Validators, ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { isNumber } from '@lemoncode/fonk-is-number-validator';

const validationSchema: ValidationSchema = {
  field: {
    products: [
      {
        validator: Validators.array,
        customArgs: {
          field: {
            name: [Validators.required],
            quantity: [Validators.required, isNumber],
            price: [Validators.required, isNumber],
          },
        },
      },
    ],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
