import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    login: [Validators.required],
    password: [
      {
        validator: Validators.required,
        customArgs: { trim: false },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
