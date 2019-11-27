import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

// Spanish message
Validators.required.setErrorMessage("Debe informar el campo");

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

export const formValidation = createFinalFormValidation(validationSchema);
