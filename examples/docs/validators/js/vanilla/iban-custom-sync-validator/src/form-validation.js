import { createFormValidation } from '@lemoncode/fonk';
import { ibanValidator } from './custom-validator';

const validationSchema = {
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

export const formValidation = createFormValidation(validationSchema);
