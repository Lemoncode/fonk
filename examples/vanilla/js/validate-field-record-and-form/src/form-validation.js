import { Validators, createFormValidation } from '@lemoncode/fonk';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema = {
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
