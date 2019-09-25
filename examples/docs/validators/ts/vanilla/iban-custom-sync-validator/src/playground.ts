import { createFormValidation, ValidationSchema } from '@lemoncode/fonk';
import { ibanValidator } from './custom-validator';

const validationSchema: ValidationSchema = {
  field: {
    account: [
      {
        validator: ibanValidator,
        customArgs: {
          countryCode: 'ES',
        },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

export const failedLoginRecord = {
  account: '',
};

export const succeededLoginRecord = {
  account: 'ES0051354874545454546462',
};

export const getResults = () => {
  return Promise.all([
    formValidation.validateField('account', failedLoginRecord.account),
    formValidation.validateField('account', succeededLoginRecord.account),
  ]);
};
