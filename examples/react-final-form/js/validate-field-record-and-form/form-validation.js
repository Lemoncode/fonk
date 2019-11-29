import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema = {
  field: {
    product: [Validators.required],
    discount: [Validators.required],
    price: [Validators.required],
  },
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
