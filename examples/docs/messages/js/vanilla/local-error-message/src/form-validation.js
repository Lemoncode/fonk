import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    ibanAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^ES\d*$/ },
        message: 'Invalid IBAN number',
      },
    ],
    bicAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^BIC\d*$/ },
        message: 'Invalid BIC number',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
