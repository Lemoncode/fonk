import type {
  Errors,
  DeepKey,
  ValidationSchema,
  ArrayValidationContext,
  ValidateFieldFn,
  ValidatorFn,
} from './fonk.model.js';
import { extractArrayIndexes, getValueAtPath, hasSomeError, isArrayField, normalizeField } from './fonk.helpers.js';

type Fonk<Model> = {
  validateField: ValidateFieldFn<Model>;
  validateAll: (values: Model) => Promise<Errors<Model>>;
};

// TODO: Check this "standard" for validation libraries: https://github.com/standard-schema/standard-schema
export const getFonk = <Model>(validationSchema: ValidationSchema<Model>): Fonk<Model> => {
  const validateField: ValidateFieldFn<Model> = async (field, value, values, arrayIndexes) => {
    const fallbackArrayIndexes = arrayIndexes ?? extractArrayIndexes(field);
    const normalizedField = normalizeField(field);
    const validators: ReturnType<ValidatorFn>[] = validationSchema[normalizedField] || [];

    for (const validator of validators) {
      const error = await validator({ value, values, arrayIndexes: fallbackArrayIndexes });
      if (error) {
        return error;
      }
    }
  };

  const parseSegment = (segment: string): string =>
    isArrayField(segment) ? segment.substring(0, segment.indexOf('[')) : segment;

  const validateArraySegment = async <Field extends DeepKey<Model>>(
    nextContext: ArrayValidationContext<Model, Field>,
    value: any,
    segment: string,
    isLastSegment: boolean
  ) => {
    const errors: Errors<Model> = {};
    for (let index = 0; index < value.length; index++) {
      const arrayIndexes = {
        ...(nextContext.arrayIndexes ?? {}),
        [nextContext.lastArrayIndexSegment]: index,
      };
      if (isLastSegment) {
        const error = await validateField(nextContext.field, value[index], nextContext.values, arrayIndexes);
        errors[`${segment}[${index}]`] = error;
      } else {
        const nestedErrors = await validateArrayField({
          ...nextContext,
          segmentValue: value[index],
          arrayIndexes,
        });
        for (const key in nestedErrors) {
          errors[`${segment}[${index}].${key}`] = nestedErrors[key];
        }
      }
    }
    return errors;
  };

  const validateArrayField = async <Field extends DeepKey<Model>>(context: ArrayValidationContext<Model, Field>) => {
    let errors: Errors<Model> = {};
    const originalSegment = context.path[0];
    const segment = parseSegment(originalSegment);
    const value = getValueAtPath([segment], context.segmentValue);
    const nextPath = context.path.slice(1);
    const isLastSegment = nextPath.length === 0;
    const arrayIndexSegment = context.lastArrayIndexSegment ? `${context.lastArrayIndexSegment}.${segment}` : segment;
    const nextContex: ArrayValidationContext<Model, Field> = {
      ...context,
      path: nextPath,
      segmentValue: value,
      lastArrayIndexSegment: arrayIndexSegment,
    };

    if (isArrayField(originalSegment) && Array.isArray(value)) {
      const arraySegmentErrors = await validateArraySegment(nextContex, value, segment, isLastSegment);
      errors = { ...errors, ...arraySegmentErrors };
    } else if (isLastSegment) {
      const error = await validateField(context.field, value, context.values, context.arrayIndexes);
      errors[segment] = error;
    } else {
      // Validate object segment
      const nestedErrors = await validateArrayField(nextContex);
      for (const key in nestedErrors) {
        errors[`${segment}.${key}`] = nestedErrors[key];
      }
    }
    return errors;
  };

  return {
    validateField,
    validateAll: async (values: Model): Promise<Errors<Model>> => {
      let errors: Errors<Model> = {};

      for (const key in validationSchema) {
        const field = key as DeepKey<Model>;
        const path = field.split('.');
        if (isArrayField(field)) {
          const arrayErrors = await validateArrayField({
            field,
            values,
            path,
            segmentValue: values,
          });
          errors = { ...errors, ...arrayErrors };
        } else {
          const value = getValueAtPath(path, values);
          const error = await validateField(field, value, values);
          errors[field] = error;
        }
      }

      return hasSomeError(errors) ? errors : undefined;
    },
  };
};
