import {
  createFormValidation,
  Validators,
  ValidationSchema,
} from '@lemoncode/form-validation';
import { matchFieldValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
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
