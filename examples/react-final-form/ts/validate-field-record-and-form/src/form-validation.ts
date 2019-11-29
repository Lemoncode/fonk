import {
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { freeShippingRecordValidator } from "./custom-validators";

const validationSchema: ValidationSchema = {
  field: {
    product: [Validators.required],
    discount: [Validators.required],
    price: [Validators.required]
  },
  record: {
    freeShipping: [freeShippingRecordValidator]
  }
};

export const formValidation = createFinalFormValidation(validationSchema);
