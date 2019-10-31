import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    login: [Validators.required.validator],
    password: [
      {
        validator: Validators.required.validator,
        customArgs: { trim: false },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
