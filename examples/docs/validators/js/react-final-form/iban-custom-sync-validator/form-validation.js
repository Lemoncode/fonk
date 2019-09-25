import { createFormValidation, Validators } from '@lemoncode/fonk';
import { ibanValidator} from './custom-validators';

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
