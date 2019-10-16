import { Validators, createFormValidation } from '@lemoncode/fonk';

// Spanish message
Validators.required.setErrorMessage("Debe informar el campo");

const validationSchema = {
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
