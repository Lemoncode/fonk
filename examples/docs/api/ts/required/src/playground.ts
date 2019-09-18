import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const ValidationSchema: ValidationSchema = {
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

const formValidation = createFormValidation(ValidationSchema);

export const loginModel = {
  user: '    ',
  password: '    ',
};

export const getResults = () => {
  return formValidation.validateForm(loginModel);
};
