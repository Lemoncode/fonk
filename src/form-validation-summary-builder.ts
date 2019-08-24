import {
  ValidationResult,
  FormValidationSummary,
  createDefaultFormValidationSummary,
  FormFieldError,
} from './model';
import { arrayContainsElements } from './helper';
import { globalFormValidationId } from './const';

const didAllValidationsSucceeded = (
  validationResults: ValidationResult[]
): boolean => validationResults.every(fvr => fvr.succeeded);

const extractFieldErrors = (
  validationResults: ValidationResult[]
): FormFieldError[] => {
  const fieldValidationResults = validationResults.filter(
    fvr => fvr.key !== globalFormValidationId
  );

  return fieldValidationResults.map(validation => ({
    key: validation.key,
    validationResult: validation,
  }));
};

const extractFormRecordErrors = (
  validationResults: ValidationResult[]
): ValidationResult[] =>
  validationResults.filter(fvr => fvr.key === globalFormValidationId);

const removeNotValidValidationResults = (
  validationResults: ValidationResult[]
): ValidationResult[] =>
  validationResults.filter(fvr => fvr !== undefined && fvr !== null);

const setEmptyKeysToGlobalKeys = (
  validationResults: ValidationResult[]
): ValidationResult[] =>
  validationResults.map(validationResult =>
    validationResult.key
      ? validationResult
      : {
          ...validationResult,
          key: globalFormValidationId,
        }
  );

const cleanupValidationResultCollection = (
  validationResults: ValidationResult[]
): ValidationResult[] => {
  let collectionProcessed = removeNotValidValidationResults(validationResults);
  // TODO check why this is needed
  collectionProcessed = setEmptyKeysToGlobalKeys(collectionProcessed);

  return collectionProcessed;
};

export const buildFormValidationResult = (
  validationResults: ValidationResult[]
): FormValidationSummary => {
  const formValidationSummary = createDefaultFormValidationSummary();

  if (arrayContainsElements(validationResults)) {
    const processedValidationResults = cleanupValidationResultCollection(
      validationResults
    );

    formValidationSummary.succeeded = didAllValidationsSucceeded(
      processedValidationResults
    );

    formValidationSummary.fieldErrors = extractFieldErrors(
      processedValidationResults
    );

    formValidationSummary.formGlobalErrors = extractFormRecordErrors(
      processedValidationResults
    );
  }

  return formValidationSummary;
};
