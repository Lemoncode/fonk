import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

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

const formValidation = createFormValidation(validationSchema);

export const loginModel = {
  user: '',
  password: '',
};

export const getResults = () => {
  return formValidation.validateForm(loginModel);
};
