import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';

const validationSchema = {
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

export const formValidation = createFormValidation(validationSchema);
