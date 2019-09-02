import {
  RecordValidationSchema,
  InternalRecordValidationSchema,
  RecordValidation,
  InternalRecordValidation,
} from '../model';
import { isFunction } from '../helper';
import { convertRecordValidationToAsyncIfNeeded } from './mapper-helpers';

type RecordIdInternalValidation = [string, InternalRecordValidation[]];

const mapToInternalRecordValidation = (
  recordValidation: RecordValidation
): InternalRecordValidation =>
  isFunction(recordValidation)
    ? {
        validator: convertRecordValidationToAsyncIfNeeded(recordValidation),
        message: void 0,
      }
    : {
        validator: convertRecordValidationToAsyncIfNeeded(
          recordValidation.validator
        ),
        message: recordValidation.message,
      };

const mapToInternalValidationCollection = (
  recordValidations: RecordValidation[]
) =>
  Array.isArray(recordValidations)
    ? recordValidations.map(mapToInternalRecordValidation)
    : [];

const buildIntertalSchema = (
  internalSchema: RecordIdInternalValidation[]
): InternalRecordValidationSchema =>
  internalSchema.reduce(
    (internalRecordValidations, [recordId, recordValidations]) => {
      internalRecordValidations[recordId] = recordValidations;
      return internalRecordValidations;
    },
    {}
  );

export const mapToInternalRecordValidationSchema = (
  recordValidationSchema: RecordValidationSchema
): InternalRecordValidationSchema => {
  const validationSchema =
    recordValidationSchema instanceof Object ? recordValidationSchema : {};

  const internalRecordValidations: RecordIdInternalValidation[] = Object.entries(
    validationSchema
  ).map(([fielId, recordValidations]) => [
    fielId,
    mapToInternalValidationCollection(recordValidations),
  ]);

  return buildIntertalSchema(internalRecordValidations);
};
