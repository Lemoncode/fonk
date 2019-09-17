import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    product: [
      {
        validator: Validators.required.validator,
        message: 'My custom error message',
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const getResults = () => {
  const formValues = {
    product: '',
  };

  return formValidation.validateField('product', formValues.product);
};
