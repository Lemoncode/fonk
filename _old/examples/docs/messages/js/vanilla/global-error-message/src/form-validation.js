import { Validators, createFormValidation } from '@lemoncode/fonk';

// Spanish message
Validators.required.setErrorMessage('Debe informar el campo');

const validationSchema = {
  field: {
    user: [Validators.required],
    password: [
      {
        validator: Validators.required,
        customArgs: { trim: false },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
