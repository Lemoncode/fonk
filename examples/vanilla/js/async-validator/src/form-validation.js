import { Validators, createFormValidation } from '@lemoncode/fonk';
import { userExistsOnGithubValidator } from './custom-validators';

const validationSchema = {
  field: {
    user: [Validators.required, userExistsOnGithubValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
