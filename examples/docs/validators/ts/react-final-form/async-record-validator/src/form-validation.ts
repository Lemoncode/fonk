import { ValidationSchema, createFormValidation } from '@lemoncode/fonk';
import { processValidator } from './custom-validator';

const validationSchema: ValidationSchema = {
  record: {
    process: [processValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
