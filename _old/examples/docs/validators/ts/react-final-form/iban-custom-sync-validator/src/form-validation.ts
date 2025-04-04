import { ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
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

export const formValidation = createFinalFormValidation(validationSchema);
