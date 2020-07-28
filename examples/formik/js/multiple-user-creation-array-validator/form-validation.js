import { Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';
import { matchField } from '@lemoncode/fonk-match-field-validator';

const validationSchema = {
  field: {
    products: [
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

export const formValidation = createFormikValidation(validationSchema);
