import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    email: [Validators.email.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  email: '',
};

export const getResults = () => {
  return formValidation.validateForm(formValues);
};
