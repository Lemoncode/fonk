import {
  createFormValidation,
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { freeShippingRecordValidator } from "./custom-validators";

Validators.required.setErrorMessage("Required");

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

export const formValidation = createFormValidation(validationSchema);
