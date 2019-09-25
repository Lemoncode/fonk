import { createFormValidation, ValidationSchema } from '@lemoncode/fonk';
import { ibanValidator } from './custom-validators';

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
