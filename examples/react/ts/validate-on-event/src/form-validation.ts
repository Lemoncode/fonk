import {
  createFormValidation,
  Validators,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    firstName: [
      {
        validator: Validators.required.validator,
        message: 'Required',
        events: ['change', 'dblclick'],
      },
    ],
    lastName: [
      {
        validator: Validators.required.validator,
        message: 'Required',
        events: ['blur'],
      },
    ],
    age: [
      {
        validator: Validators.required.validator,
        message: 'Required',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
