import type { Errors, DeepKey, DeepValue, ErrorMessage, ValidationSchema, ArrayIndexes } from './model.js';
const ARRAY_FIELD_REGEX = /\[(\d+)\]/g;

const isArrayField = <Field>(field: Field): boolean =>
  ARRAY_FIELD_REGEX.test(field as string) || /\[i\]/.test(field as string);

export const getFonk = <Model, ValidationResult = ErrorMessage>(
  validationSchema: ValidationSchema<Model, ValidationResult>
) => {
  const validateField = async <Field extends DeepKey<Model>>(
    field: Field,
    value: DeepValue<Model, Field & string>,
    values?: Model,
    arrayIndexes?: ArrayIndexes<Field & string>
  ): Promise<ValidationResult | undefined> => {
    const key = isArrayField(field) ? field.replaceAll(ARRAY_FIELD_REGEX, '[i]') : field;
    const validators = validationSchema[key as Field] || [];

    for (const validator of validators) {
      const error = await validator({ value, values, arrayIndexes });
      if (error) {
        return error;
      }
    }
  };

  // TODO: Temporal solution. Refactor
  const getDeepValue = (field: string, values: any) => {
    const keys = field.split('.');
    return keys.reduce((result, key) => {
      if (result && typeof result === 'object') {
        return result[key];
      }
      return undefined;
    }, values);
  };

  const hasSomeError = (errors: Errors<Model, ValidationResult>): boolean =>
    Object.values(errors).some(error => error !== undefined);

  const getFirstField = (field: string): string => {
    const firstPart = field.split('.')[0];
    return isArrayField(firstPart) ? firstPart.substring(0, firstPart.indexOf('[')) : firstPart;
  };

  const validateArrayField = async <Field extends DeepKey<Model>>(
    field: Field,
    values: Model,
    nestedField?: string,
    nestedValues?: any,
    arrayIndexes?: ArrayIndexes<Field & string>,
    parentPath?: string
  ): Promise<Errors<Model, ValidationResult>> => {
    const errors: Errors<Model, ValidationResult> = {};
    const currentField = nestedField ?? field;
    const firstField = getFirstField(currentField);
    const value = getDeepValue(firstField, nestedValues ?? values);
    const nextField = currentField.split('.').slice(1).join('.');

    const fullPath = parentPath ? `${parentPath}.${firstField}` : firstField;

    if (currentField !== firstField && Array.isArray(value)) {
      for (const [index, v] of value.entries()) {
        if (nextField) {
          const arrayErrors = await validateArrayField(
            field,
            values,
            nextField,
            v,
            {
              ...(arrayIndexes ?? {}),
              [fullPath]: index, // Usar la ruta completa como clave
            },
            fullPath
          );
          for (const propertyKey in arrayErrors) {
            errors[`${firstField}[${index}].${propertyKey}`] = arrayErrors[propertyKey];
          }
        } else {
          const error = await validateField(field, v, values, {
            ...(arrayIndexes ?? {}),
            [fullPath]: index,
          });
          errors[`${firstField}[${index}]`] = error;
        }
      }
    } else if (nextField) {
      const arrayErrors = await validateArrayField(field, values, nextField, value, arrayIndexes, fullPath);
      for (const propertyKey in arrayErrors) {
        errors[`${firstField}.${propertyKey}`] = arrayErrors[propertyKey];
      }
    } else {
      const error = await validateField(field, value, values, arrayIndexes);
      errors[firstField] = error;
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
