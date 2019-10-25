import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';
import { userExistsOnGithubValidator } from './custom-validators';

const validationSchema = {
  field: {
    user: [Validators.required.validator, userExistsOnGithubValidator],
  },
};

export const formValidation = createFormikValidation(validationSchema);
