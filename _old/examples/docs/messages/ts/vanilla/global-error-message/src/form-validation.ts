import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

// Spanish message
Validators.required.setErrorMessage('Debe informar el campo');

const validationSchema: ValidationSchema = {
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
