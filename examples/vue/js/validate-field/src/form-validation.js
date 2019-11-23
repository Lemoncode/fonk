import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { minNumberValidator } from './custom-validators';

const validationSchema = {
  field: {
    firstName: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
    ],
    lastName: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
    ],
    age: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
      isNumber.validator,
      {
        validator: minNumberValidator,
        customArgs: { min: 18 },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
