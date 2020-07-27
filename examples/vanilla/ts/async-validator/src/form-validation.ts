import {
  Validators,
  ValidationSchema,
  createFormValidation,
  
} from '@lemoncode/fonk';
import { userExistsOnGithubValidator } from './custom-validators';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required, userExistsOnGithubValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
