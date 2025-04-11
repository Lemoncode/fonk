import type { Errors, DeepKey, DeepValue, ErrorMessage, ValidationSchema } from './model.js';

const ARRAY_FIELD_REGEX = /\[(\d+)\]/g;

const isArrayField = <Field>(field: Field): boolean =>
  ARRAY_FIELD_REGEX.test(field as string) || /\[i\]/.test(field as string);

export const getFonk = <Model, ValidationResult = ErrorMessage>(
  validationSchema: ValidationSchema<Model, ValidationResult>
) => {
  const validateField = async <Field extends DeepKey<Model>>(
    field: Field,
    value: DeepValue<Model, Field & string>,
    values?: Model
  ): Promise<ValidationResult | undefined> => {
    const key = isArrayField(field) ? field.replaceAll(ARRAY_FIELD_REGEX, '[i]') : field;
    const validators = validationSchema[key as Field] || [];

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

  const hasSomeError = (errors: Errors<Model, ValidationResult>): boolean =>
    Object.values(errors).some(error => error !== undefined);

  const validateArrayField = async <Field extends DeepKey<Model>>(
    field: Field,
    values: Model,
    nestedProperty?: string
  ): Promise<Errors<Model, ValidationResult>> => {
    const errors: Errors<Model, ValidationResult> = {};
    const [arrayField] = nestedProperty ? nestedProperty.split('[i].') : field.split('[i].');
    const arrayFieldLength = `${arrayField}[i].`.length;
    const property = nestedProperty ? nestedProperty.substring(arrayFieldLength) : field.substring(arrayFieldLength);
    const array = getDeepValue(arrayField as DeepKey<Model>, values);
    console.log(
      `Validating array field ${arrayField} with value ${JSON.stringify(array)} and property ${property}, nestedProperty ${nestedProperty}`
    );
    if (Array.isArray(array)) {
      for (const [index, item] of array.entries()) {
        if (isArrayField(property)) {
          const propertyErrors = await validateArrayField(field, item, property);
          for (const propertyKey in propertyErrors) {
            errors[`${arrayField}[${index}]${propertyKey}`] = propertyErrors[propertyKey];
          }
        } else {
          const key = `${arrayField}[${index}].${property}` as DeepKey<Model>;
          errors[key] = await validateField(field, item[property], item);
        }
      }
    }
    return errors;
  };

  return {
    validateField,
    validateAll: async (values: Model): Promise<Errors<Model, ValidationResult>> => {
      let errors: Errors<Model, ValidationResult> = {};

      for (const key in validationSchema) {
        const field = key as DeepKey<Model>;
        if (isArrayField(field)) {
          const arrayErrors = await validateArrayField(field, values);
          errors = { ...errors, ...arrayErrors };
        } else {
          const value = getDeepValue(field, values);
          const error = await validateField(field, value, values);
          errors[field] = error;
        }
      }

      return hasSomeError(errors) ? errors : undefined;
    },
  };
};
