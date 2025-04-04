import { createFormValidation } from '@lemoncode/fonk';
import { processValidator } from './custom-validator';

const validationSchema = {
  record: {
    process: [processValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);
