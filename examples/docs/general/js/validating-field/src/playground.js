import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    user: [
      Validators.required.validator,
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 3 },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const failedLoginRecord = {
  user: '',
  password: '',
};

export const succeededLoginRecord = {
  user: 'abc',
  password: '',
};

export const getResults = () => {
  return Promise.all([
    formValidation.validateField('user', failedLoginRecord.user),
    formValidation.validateField('user', succeededLoginRecord.user),
  ]);
};
