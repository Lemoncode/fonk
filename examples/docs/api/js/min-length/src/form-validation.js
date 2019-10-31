import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    description: [
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 10 },
        message: 'The min length is {{length}}',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
