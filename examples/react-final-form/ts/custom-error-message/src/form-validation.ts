import {
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';

const validationSchema: ValidationSchema = {
  field: {
    product: [
      {
        validator: Validators.required,
        message: "My custom error message"
      }
    ]
  }
};

export const formValidation = createFinalFormValidation(validationSchema);
