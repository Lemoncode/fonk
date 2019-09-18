import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
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

export const formValues = {
  product: '',
};

export const getResults = () => {
  return formValidation.validateField('product', formValues.product);
};
