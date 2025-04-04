import { createFormValidation } from '@lemoncode/fonk';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
