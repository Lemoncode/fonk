import { Validators, ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { userExistsOnGithubValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required, userExistsOnGithubValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
