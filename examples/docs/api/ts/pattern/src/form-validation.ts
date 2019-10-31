import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    phone1: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: '^7\\d{9}$' },
        message: 'Please provide format like {{pattern}}',
      },
    ],
    phone2: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^8\d{9}$/ },
        message: 'Please provide format like {{pattern}}',
      },
    ],
    phone3: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: new RegExp(/^9\d{9}$/) },
        message: 'Please provide format like {{pattern}}',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
