import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    'product.name': [Validators.required.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  product: {
    id: 0,
    name: '',
  },
};

export const getResults = () => {
  return formValidation.validateField('product.name', formValues.product.name);
};
