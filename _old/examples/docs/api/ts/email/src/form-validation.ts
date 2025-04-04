import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    email: [Validators.email],
  },
};

export const formValidation = createFormValidation(validationSchema);
