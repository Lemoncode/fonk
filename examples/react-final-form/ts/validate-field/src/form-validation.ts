import {
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { isNumber } from "@lemoncode/fonk-is-number-validator";
import { minNumberValidator } from "./custom-validators";

const validationSchema: ValidationSchema = {
  field: {
    firstName: [
      {
        validator: Validators.required,
        message: "Required"
      }
    ],
    lastName: [
      {
        validator: Validators.required,
        message: "Required"
      }
    ],
    age: [
      {
        validator: Validators.required,
        message: "Required"
      },
      isNumber,
      {
        validator: minNumberValidator,
        customArgs: { min: 18 }
      }
    ]
  }
};

export const formValidation = createFinalFormValidation(validationSchema);
