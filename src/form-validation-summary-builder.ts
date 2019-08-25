import {
  ValidationResult,
  FormValidationResult,
  createDefaultFormValidationSummary,
  FormFieldError,
} from './model';
import { arrayContainsEntries } from './helper';
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
): ValidationResult[] => {
  if (validationResults.some(fvr => fvr === undefined || fvr === null)) {
    console.error(
      'Some form validators are returning null / undefined, fix this'
    );
  }
  return validationResults.filter(fvr => fvr !== undefined && fvr !== null);
};

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

const removeSucceededValidations = (validationResults: ValidationResult[]) =>
  validationResults.filter(validationResult => !validationResult.succeeded);

const cleanupValidationResultCollection = (
  validationResults: ValidationResult[]
): ValidationResult[] => {
  let collectionProcessed = removeNotValidValidationResults(validationResults);
  collectionProcessed = removeSucceededValidations(collectionProcessed);
  // TODO check why this is needed
  // Does it mean global validation arrive here with an empty key ''?
  // then we map it to global?
  collectionProcessed = setEmptyKeysToGlobalKeys(collectionProcessed);

  return collectionProcessed;
};

export const buildFormValidationResult = (
  validationResults: ValidationResult[]
): FormValidationResult => {
  // TODO: [Dicussion needed here] Should we remove as well validation that had succeeded?
  // Right now it returns all validations, I think it could make no sense
  // just pass me the ones that failed, easier to manage?
  const formValidationSummary = createDefaultFormValidationSummary();

  if (arrayContainsEntries(validationResults)) {
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
