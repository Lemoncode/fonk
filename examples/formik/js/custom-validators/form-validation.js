import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

import { isNumberValidator, minNumberValidator } from './custom-validators';

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
      isNumberValidator,
      {
        validator: minNumberValidator,
        customArgs: { min: 18 },
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);