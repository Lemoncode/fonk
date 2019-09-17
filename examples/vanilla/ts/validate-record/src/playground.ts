import {
  createFormValidation,
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
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);

export const getResults = () => {
  const failedFormValues = {
    product: 'shoes',
    discount: 5,
    price: 20,
    isPrime: false,
  };
  const succeededFormValues = {
    product: 'shoes',
    discount: 5,
    price: 20,
    isPrime: true,
  };

  return Promise.all([
    formValidation.validateRecord(failedFormValues),
    formValidation.validateRecord(succeededFormValues),
  ]);
};
