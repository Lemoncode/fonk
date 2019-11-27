import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.required,
      },
      {
        validator: Validators.email,
      },
    ],
    password: [
      {
        validator: Validators.required,
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
