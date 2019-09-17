import {
  createFormValidation,
  Validators,
  RecordValidationFunctionSync,
  ValidationSchema,
} from '@lemoncode/fonk';

// A record validator receives in the args an object with all the record values and optionally the custom message
const freeShippingRecordValidator: RecordValidationFunctionSync = ({
  values,
}) => {
  const succeeded = values.isPrime || values.price - values.discount > 20;

  return {
    succeeded,
    message: succeeded
      ? ''
      : 'Subscribe to prime service or total must be greater than 20USD',
    type: 'RECORD_FREE_SHIPPING',
  };
};

const validationSchema: ValidationSchema = {
  field: {
    product: [Validators.required.validator],
    discount: [Validators.required.validator],
    price: [Validators.required.validator],
  },
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);

export const getResults = () => {
  const formValues = {
    product: '',
    discount: 5,
    price: 20,
    isPrime: false,
  };

  return Promise.all([
    formValidation.validateField('product', formValues.product),
    formValidation.validateRecord(formValues),
    formValidation.validateForm(formValues),
  ]);
};
