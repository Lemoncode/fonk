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

export const formValidation = createFormValidation(validationSchema);
