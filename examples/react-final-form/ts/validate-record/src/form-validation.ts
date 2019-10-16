import { ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
