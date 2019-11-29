import {
  Validators,
  ValidationSchema,
  createFormValidation,
} from '@lemoncode/fonk';
import { matchFieldValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
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

export const formValidation = createFormValidation(validationSchema);
