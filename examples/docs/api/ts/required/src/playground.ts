import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [
      {
        validator: Validators.required.validator,
        customArgs: { trim: false },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const loginModel = {
  user: '    ',
  password: '    ',
};

export const getResults = () => {
  return formValidation.validateForm(loginModel);
};
