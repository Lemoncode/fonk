import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
