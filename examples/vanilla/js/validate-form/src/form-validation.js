import { Validators, createFormValidation } from '@lemoncode/fonk';
import { matchFieldValidator } from './custom-validators';

const validationSchema = {
  field: {
    username: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
    ],
    password: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
    ],
    confirm: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
      {
        validator: matchFieldValidator,
        customArgs: { fieldId: 'password' },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
