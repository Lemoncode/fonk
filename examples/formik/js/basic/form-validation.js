import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema = {
  field: {
    email: [
      {
        validator: Validators.email,
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
