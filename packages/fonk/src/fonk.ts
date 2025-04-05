import type { Errors, DeepKey, DeepValue, ErrorMessage, ValidationSchema } from './model.js';

export const getFonk = <Model>(validationSchema: ValidationSchema<Model>) => {
  const validateField = async <Field extends DeepKey<Model>>(
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
  };

  // TODO: Temporal solution. Refactor
  const getDeepValue = <Field extends DeepKey<Model>>(
    field: Field,
    values: Model
  ): DeepValue<Model, Field & string> => {
    const keys = field.split('.');
    return keys.reduce((result, key) => {
      if (result && typeof result === 'object') {
        return result[key];
      }
      return undefined;
    }, values) as DeepValue<Model, Field & string>;
  };

  const hasSomeError = (errors: Errors<Model>): boolean => Object.values(errors).some(error => error !== undefined);

  return {
    validateField,
    validateAll: async (values: Model): Promise<Errors<Model>> => {
      const errors: Errors<Model> = {};

      for (const field in validationSchema) {
        const value = getDeepValue(field as DeepKey<Model>, values);
        const error = await validateField(field as DeepKey<Model>, value, values);
        errors[field as DeepKey<Model>] = error;
      }

      return hasSomeError(errors) ? errors : undefined;
    },
  };
};
