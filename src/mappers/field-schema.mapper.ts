import {
  FieldValidationSchema,
  InternalFieldValidationSchema,
  FieldValidation,
  InternalFieldValidation,
} from '../model';
import { isFunction, arrayContainsEntries } from '../helper';
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
        // TODO: Add unit tests
        events: [],
      }
    : {
        validator: convertFieldValidationToAsyncIfNeeded(
          fieldValidation.validator
        ),
        customArgs: fieldValidation.customArgs,
        message: fieldValidation.message,
        events: arrayContainsEntries(fieldValidation.events)
          ? fieldValidation.events
          : [],
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
