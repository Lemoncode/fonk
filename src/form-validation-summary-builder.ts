import {
  ValidationResult,
  InternalValidationResult,
  createDefaultInternalFormValidationResult,
  createDefaultRecordValidationResult,
  RecordValidationResult,
  InternalFormValidationResult,
} from './model';
import { arrayContainsEntries } from './helpers';

const didAllValidationsSucceeded = (
  validationResults: InternalValidationResult[]
): boolean => validationResults.every(fvr => fvr.succeeded);

const extractErrors = (
  validationResults: InternalValidationResult[]
): { [id: string]: InternalValidationResult } =>
  validationResults.reduce((errors, { key, ...validationResult }) => {
    errors[key] = { ...validationResult };
    return errors;
  }, {});

export const buildRecordValidationResult = (
  validationResults: InternalValidationResult[]
): RecordValidationResult => {
  const recordValidationResult = createDefaultRecordValidationResult();

  if (arrayContainsEntries(validationResults)) {
    recordValidationResult.succeeded = didAllValidationsSucceeded(
      validationResults
    );

    recordValidationResult.recordErrors = extractErrors(validationResults);
  }
  return recordValidationResult;
};

export const buildFormValidationResult = (
  fieldValidationResults: InternalValidationResult[],
  recordValidationResults: InternalValidationResult[]
): InternalFormValidationResult => {
  const formValidationResult = createDefaultInternalFormValidationResult();

  if (arrayContainsEntries(fieldValidationResults)) {
    formValidationResult.succeeded = didAllValidationsSucceeded(
      fieldValidationResults
    );
    formValidationResult.fieldErrors = extractErrors(fieldValidationResults);
  }

  if (arrayContainsEntries(recordValidationResults)) {
    const recordResults = buildRecordValidationResult(recordValidationResults);
    formValidationResult.succeeded =
      formValidationResult.succeeded && recordResults.succeeded;
    formValidationResult.recordErrors = recordResults.recordErrors;
  }

  return formValidationResult;
};
