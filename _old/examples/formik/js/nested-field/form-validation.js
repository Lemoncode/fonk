import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema = {
  field: {
    'product.name': [Validators.required],
  },
};

export const formValidation = createFormikValidation(validationSchema);
