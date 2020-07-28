import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';

const validationSchema = {
  field: {
    users: [
      {
        validator: Validators.array,
        customArgs: {
          field: {
            name: [Validators.required],
            email: [Validators.required, Validators.email],
            repeatEmail: [
              Validators.required,
              Validators.email,
              {
                validator: matchField,
                customArgs: { field: 'email' },
              },
            ],
          },
        },
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
