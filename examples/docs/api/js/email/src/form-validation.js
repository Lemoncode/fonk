import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    email: [Validators.email],
  },
};

export const formValidation = createFormValidation(validationSchema);
