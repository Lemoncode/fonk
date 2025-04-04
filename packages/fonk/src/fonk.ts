import type { DeepKey, DeepValue, ErrorMessage, ValidationSchema } from './model.js';

export const getFonk = <Model>(validationSchema: ValidationSchema<Model>) => {
  return {
    validateField: async <Field extends DeepKey<Model>>(
      field: Field,
      value: DeepValue<Model, Field & string>,
      values?: Model
    ): Promise<ErrorMessage | undefined> => {
      const validators = validationSchema[field] || [];

      for (const validator of validators) {
        const error = await validator({ value, values });
        if (error) {
          return error;
        }
      }
    },
  };
};
