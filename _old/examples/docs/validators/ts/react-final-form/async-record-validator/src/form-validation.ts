import { ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { processValidator } from './custom-validator';

const validationSchema: ValidationSchema = {
  record: {
    process: [processValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
