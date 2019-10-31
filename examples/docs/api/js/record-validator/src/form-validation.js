import { Validators, createFormValidation } from '@lemoncode/fonk';

const freeShippingAllowed = ({ values }) => {
  const succeeded = values.subtotal - values.discount >= 30;
  return {
    type: 'RECORD_FREE_SHIPPING',
    succeeded,
    message: succeeded
      ? ''
      : 'Total must be greater than 30USD to get cost free shippings',
  };
};

const validationSchema = {
  record: {
    freeShippingValidation: [freeShippingAllowed],
  },
};

export const formValidation = createFormValidation(validationSchema);
