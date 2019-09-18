import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    description: [
      {
        validator: Validators.maxLength.validator,
        customArgs: { length: 20 }, // Valid description for length lower than 20 chars
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
