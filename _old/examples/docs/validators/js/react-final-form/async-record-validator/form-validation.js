import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { processValidator } from './custom-validator';

const validationSchema = {
  record: {
    process: [processValidator],
  },
};

export const formValidation = createFinalFormValidation(validationSchema);
