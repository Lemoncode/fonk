import {
  Validators,
  ValidationSchema,
  createFormValidation,
} from '@lemoncode/fonk';
import { freeShippingRecordValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  field: {
    product: [Validators.required],
    discount: [Validators.required],
    price: [Validators.required],
  },
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
