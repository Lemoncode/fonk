import {
  ValidationResult,
  InternalValidationResult,
  FormValidationResult,
  createDefaultFormValidationResult,
  createDefaultRecordValidationResult,
  RecordValidationResult,
} from './model';
import { arrayContainsEntries } from './helper';

const didAllValidationsSucceeded = (
  validationResults: InternalValidationResult[]
): boolean => validationResults.every(fvr => fvr.succeeded);

const extractErrors = (
  validationResults: InternalValidationResult[]
): { [id: string]: ValidationResult } =>
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
): FormValidationResult => {
  const formValidationResult = createDefaultFormValidationResult();

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
