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

const formValidation = createFormValidation(validationSchema);

export const loginModel = {
  user: '    ',
  password: '    ',
};

export const getResults = () => {
  return formValidation.validateForm(loginModel);
};
