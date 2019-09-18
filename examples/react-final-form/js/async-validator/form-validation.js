import { createFormValidation, Validators } from "@lemoncode/fonk";
import { userExistsOnGithubValidator } from "./custom-validators";

const validationSchema = {
  field: {
    user: [Validators.required.validator, userExistsOnGithubValidator]
  }
};

export const formValidation = createFormValidation(validationSchema);
