import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    email: [Validators.email.validator],
  },
};

export const formValidation = createFormValidation(validationSchema);
