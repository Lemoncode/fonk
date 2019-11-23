import {
  FieldValidationSchema,
  InternalFieldValidationSchema,
  FieldValidation,
  InternalFieldValidation,
} from '../model';
import { isFunction } from '../helpers';
import { convertFieldValidationToAsyncIfNeeded } from './mapper-helpers';

type FieldIdInternalValidation = [string, InternalFieldValidation[]];

const mapToInternalFieldValidation = (
  fieldValidation: FieldValidation
): InternalFieldValidation =>
  isFunction(fieldValidation)
    ? {
        validator: convertFieldValidationToAsyncIfNeeded(fieldValidation),
        message: void 0,
        customArgs: void 0,
      }
    : {
        validator: convertFieldValidationToAsyncIfNeeded(
          isFunction(fieldValidation.validator)
            ? fieldValidation.validator
            : fieldValidation.validator.validator
        ),
        customArgs: fieldValidation.customArgs,
        message: fieldValidation.message,
      };

const mapToInternalValidationCollection = (
  fieldValidations: FieldValidation[]
) =>
  Array.isArray(fieldValidations)
    ? fieldValidations.map(mapToInternalFieldValidation)
    : [];

const buildIntertalSchema = (
  internalSchema: FieldIdInternalValidation[]
): InternalFieldValidationSchema =>
  internalSchema.reduce(
    (internalFieldValidations, [fieldId, fieldValidations]) => {
      internalFieldValidations[fieldId] = fieldValidations;
      return internalFieldValidations;
    },
    {}
  );

export const mapToInternalFieldValidationSchema = (
  fieldValidationSchema: FieldValidationSchema
): InternalFieldValidationSchema => {
  const validationSchema =
    fieldValidationSchema instanceof Object ? fieldValidationSchema : {};

  const internalFieldValidations: FieldIdInternalValidation[] = Object.entries(
    validationSchema
  ).map(([fielId, fieldValidations]) => [
    fielId,
    mapToInternalValidationCollection(fieldValidations),
  ]);

  return buildIntertalSchema(internalFieldValidations);
};
