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
        customArgs: { pattern: '^(7|8|9)\\d{9}$' },
      },
    ],
    phone2: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^(7|8|9)\d{9}$/ },
      },
    ],
    phone3: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: new RegExp(/^(7|8|9)\d{9}$/) },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  phone1: '7123456789',
  phone2: '8123456789',
  phone3: '9123456789',
};

export const getResults = () => {
  return formValidation.validateForm(formValues);
};
