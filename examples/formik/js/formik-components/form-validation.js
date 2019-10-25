import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.required.validator,
      },
      {
        validator: Validators.email.validator,
      },
    ],
    password: [
      {
        validator: Validators.required.validator,
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
