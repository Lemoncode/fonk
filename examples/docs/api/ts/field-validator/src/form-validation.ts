import { Validators, createFormValidation, ValidationSchema } from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator, Validators.email.validator],
    password: [
      Validators.required.validator,
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 3 },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
