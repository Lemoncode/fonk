import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema = {
  field: {
    product: [
      {
        validator: Validators.required.validator,
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
