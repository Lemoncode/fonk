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

export const getResults = () => {
  const failedLoginRecord = {
    user: '',
    password: '',
  };

  const succeededLoginRecord = {
    user: 'John',
    password: '1234',
  };

  return Promise.all([
    formValidation.validateForm(failedLoginRecord),
    formValidation.validateForm(succeededLoginRecord),
  ]);
};
