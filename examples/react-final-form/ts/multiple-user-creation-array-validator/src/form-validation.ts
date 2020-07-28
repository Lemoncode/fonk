import { Validators, ValidationSchema } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { matchField } from '@lemoncode/fonk-match-field-validator';

const validationSchema: ValidationSchema = {
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

export const formValidation = createFinalFormValidation(validationSchema);
