import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
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
