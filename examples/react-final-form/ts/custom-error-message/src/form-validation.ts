import {
  createFormValidation,
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";

const validationSchema: ValidationSchema = {
  field: {
    product: [
      {
        validator: Validators.required.validator,
        message: "My custom error message"
      }
    ]
  }
};

export const formValidation = createFormValidation(validationSchema);
