import { createFormValidation } from '@lemoncode/fonk';
import { isNumberValidator, minNumberValidator } from './custom-validators';

const validationSchema = {
  field: {
    age: [
      isNumberValidator,
      {
        validator: minNumberValidator,
        customArgs: { min: 18 },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  age: 0,
};

export const getResults = () => {
  return formValidation.validateForm(formValues);
};
