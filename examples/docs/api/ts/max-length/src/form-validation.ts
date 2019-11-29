import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    description: [
      {
        validator: Validators.maxLength,
        customArgs: { length: 20 },
        message: 'The max length is {{length}}',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
