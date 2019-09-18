import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [Validators.required.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

export const failedLoginRecord = {
  user: '',
  password: '',
};

export const succeededLoginRecord = {
  user: 'John',
  password: '1234',
};

export const getResults = () => {

  return Promise.all([
    formValidation.validateForm(failedLoginRecord),
    formValidation.validateForm(succeededLoginRecord),
  ]);
};
