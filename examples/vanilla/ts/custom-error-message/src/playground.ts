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

export const getResults = () => {
  const formValues = {
    product: '',
  };

  return formValidation.validateField('product', formValues.product);
};
