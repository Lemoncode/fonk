import {
  FieldValidation,
  ValidationResult,
  createDefaultValidationResult,
} from '../model';

import {
  arrayContainsEntries,
  isFunction,
  isLastIndexInArray,
  isNorUndefinedOrNull,
} from '../helper';

interface ValidationParams {
  record: any;
  value: any;
  fieldValidationCollection: FieldValidation[];
}

const createValidationParams = (
  values: any,
  value: any,
  fieldValidationCollection: FieldValidation[]
): ValidationParams => ({
  record: values,
  value,
  fieldValidationCollection,
});

enum ValidationCheck {
  ERROR_NOT_EXPECTED,
  FAILED,
  SUCCEEDED,
}

const checkFieldValidationResult = (
  fieldValidationResult: ValidationResult
): ValidationCheck => {
  let validationCheck: ValidationCheck = null;

  if (
    !fieldValidationResult ||
    !isNorUndefinedOrNull(fieldValidationResult.succeeded)
  ) {
    validationCheck = ValidationCheck.ERROR_NOT_EXPECTED;
  } else {
    validationCheck =
      fieldValidationResult.succeeded === true
        ? ValidationCheck.SUCCEEDED
        : ValidationCheck.FAILED;
  }

  return validationCheck;
};

// TODO, we should type resolve / reject
const iterateFiringFieldValidations = (
  resolve: any,
  reject: any,
  validationParams: ValidationParams,
  currentIndex: number
): void => {
  const fieldValidation: FieldValidation =
    validationParams.fieldValidationCollection[currentIndex];

  const validationFunction = isFunction(fieldValidation)
    ? fieldValidation
    : fieldValidation.validator;

  validationFunction(
    validationParams.value,
    validationParams.record,
    fieldValidation['customArgs'] // TODO: this can be a bit dirty, if function return undefined, if not the value
  )
    .then(fieldValidationResult => {
      const validationResult = checkFieldValidationResult(
        fieldValidationResult
      );

      const isLastValidatorInCollection = isLastIndexInArray(
        currentIndex,
        validationParams.fieldValidationCollection
      );

      switch (validationResult) {
        case ValidationCheck.SUCCEEDED:
          if (isLastValidatorInCollection) {
            resolve(fieldValidationResult);
          } else {
            currentIndex++;
            iterateFiringFieldValidations(
              resolve,
              reject,
              validationParams,
              currentIndex
            );
          }
          break;
        case ValidationCheck.ERROR_NOT_EXPECTED:
          // show a console error, warn the user one of his validators is not well formed
          // if last element just return a default succeed validation
          // if not keep on iteraring
          console.error(
            'form-validators: One of the field validator is returning a non expected value.'
          );
          if (isLastValidatorInCollection) {
            resolve(createDefaultValidationResult());
          } else {
            currentIndex++;
            iterateFiringFieldValidations(
              resolve,
              reject,
              validationParams,
              currentIndex
            );
          }
          break;
        case ValidationCheck.FAILED:
          resolve(fieldValidationResult);
          break;
      }
    })
    .catch(() => {
      reject(currentIndex);
    });
};

export const fireSingleFieldValidations = (
  values: any,
  value: any,
  fieldValidations: FieldValidation[]
): Promise<ValidationResult> => {
  const validationParams = createValidationParams(
    values,
    value,
    fieldValidations
  );

  const fieldValidationResultPromise = new Promise<ValidationResult>(
    (resolve, reject) => {
      if (arrayContainsEntries(fieldValidations)) {
        iterateFiringFieldValidations(resolve, reject, validationParams, 0);
      } else {
        resolve(createDefaultValidationResult());
      }
    }
  );

  return fieldValidationResultPromise;
};
