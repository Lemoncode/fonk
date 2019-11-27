import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { matchFieldValidator } from './custom-validators';

const validationSchema = {
  field: {
    username: [
      {
        validator: Validators.required,
        message: 'Required',
      },
    ],
    password: [
      {
        validator: Validators.required,
        message: 'Required',
      },
    ],
    confirm: [
      {
        validator: Validators.required,
        message: 'Required',
      },
      {
        validator: matchFieldValidator,
        customArgs: { fieldId: 'password' },
      },
    ],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
