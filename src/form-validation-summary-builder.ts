import {
  ValidationResult,
  FormValidationResult,
  createDefaultFormValidationResult,
  createDefaultRecordValidationResult,
  RecordValidationResult,
} from './model';
import { arrayContainsEntries } from './helper';

const didAllValidationsSucceeded = (
  validationResults: ValidationResult[]
): boolean => validationResults.every(fvr => fvr.succeeded);

const extractErrors = (
  validationResults: ValidationResult[]
): { [id: string]: ValidationResult } =>
  validationResults.reduce((errors, validationResult) => {
    errors[validationResult.key] = validationResult;
    return errors;
  }, {});

export const buildRecordValidationResult = (
  validationResults: ValidationResult[]
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
  fieldValidationResults: ValidationResult[],
  recordValidationResults: ValidationResult[]
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
