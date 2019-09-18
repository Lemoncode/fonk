import {
  createFormValidation,
  ValidationSchema,
  RecordValidationFunctionSync,
} from '@lemoncode/fonk';

const freeShippingAllowed: RecordValidationFunctionSync = ({ values }) => {
  const succeeded = values.subtotal - values.discount >= 30;
  return {
    type: 'RECORD_FREE_SHIPPING',
    succeeded,
    message: succeeded
      ? ''
      : 'Total must be greater than 30USD to get cost free shippings',
  };
};

const validationSchema: ValidationSchema = {
  record: {
    freeShippingValidation: [freeShippingAllowed],
  },
};

const formValidation = createFormValidation(validationSchema);

export const checkoutForm = {
  subtotal: 0,
  discount: 0,
};

export const getResults = () => {
  return formValidation.validateRecord(checkoutForm);
};
