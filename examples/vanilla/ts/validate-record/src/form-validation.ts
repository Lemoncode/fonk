import { ValidationSchema, createFormValidation } from '@lemoncode/fonk';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
