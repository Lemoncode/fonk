import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    product: [
      {
        validator: Validators.required,
        message: 'My custom error message',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
