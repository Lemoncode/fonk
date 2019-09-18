import {
  createFormValidation,
  Validators,
  ValidationSchema
} from "@lemoncode/fonk";
import { userExistsOnGithubValidator } from "./custom-validators";

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator, userExistsOnGithubValidator]
  }
};

export const formValidation = createFormValidation(validationSchema);
