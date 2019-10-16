import {
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { freeShippingRecordValidator } from "./custom-validators";

const validationSchema: ValidationSchema = {
  field: {
    product: [Validators.required.validator],
    discount: [Validators.required.validator],
    price: [Validators.required.validator]
  },
  record: {
    freeShipping: [freeShippingRecordValidator]
  }
};

export const formValidation = createFinalFormValidation(validationSchema);
