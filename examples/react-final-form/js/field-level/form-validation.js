import { createFormValidation, Validators } from './node_modules/@lemoncode/form-validation';
import { mustBeNumberValidator } from './custom-validators';

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
      mustBeNumberValidator,
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 18 },
        message: 'Should be greater than 18',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
