import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    description: [
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 10 }, // Valid description for length greater than 10 chars
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  description: '',
};

export const getResults = () => {
  return formValidation.validateForm(formValues);
};
