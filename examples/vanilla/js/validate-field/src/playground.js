import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
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
  password: '',
};

export const getResults = () => {
  return Promise.all([
    formValidation.validateField('user', failedLoginRecord.user),
    formValidation.validateField('user', succeededLoginRecord.user),
  ]);
};
