import { createFormValidation, ValidationSchema, Validators } from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
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

const formValidation = createFormValidation(validationSchema);

export const failedValues = {
  ibanAccount: '1234',
  bicAccount: '1234',
};

export const succeededValues = {
  ibanAccount: 'ES0051354874545454546462',
  bicAccount: 'BIC0051354874545454546462',
};

export const getResults = () => {
  return Promise.all([
    formValidation.validateForm(failedValues),
    formValidation.validateForm(succeededValues),
  ]);
};
