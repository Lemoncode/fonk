import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    email: [Validators.email.validator],
  },
};

export const formValidation = createFormValidation(validationSchema);
