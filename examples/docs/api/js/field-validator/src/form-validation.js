import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    user: [Validators.required, Validators.email],
    password: [
      Validators.required,
      {
        validator: Validators.minLength,
        customArgs: { length: 3 },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
