import {
  FieldValidation,
  ValidationResult,
  createDefaultValidationResult,
  FieldValidationFunctionAsync,
} from '../model';
import { arrayContainsEntries, isFunction, isUndefinedOrNull } from '../helper';
import { convertFieldValidationToAsyncIfNeeded } from '../mappers';

const getValidationFn = (
  fieldValidation: FieldValidation
): FieldValidationFunctionAsync => {
  const validationFn = isFunction(fieldValidation)
    ? fieldValidation
    : fieldValidation.validator;

  return convertFieldValidationToAsyncIfNeeded(validationFn);
};

const checkValidationResult = (
  validationResult: ValidationResult
): ValidationResult => {
  let result: ValidationResult = validationResult;

  if (!validationResult || isUndefinedOrNull(validationResult.succeeded)) {
    // show a console error, warn the user one of his validators is not well formed
    console.error(
      'form-validators: One of the field validator is returning a non expected value.'
    );
    result = createDefaultValidationResult();
  }

  return result;
};

const fireValidation = (
  value,
  values,
  fieldValidation: FieldValidation
): Promise<ValidationResult> => {
  const validationFn = getValidationFn(fieldValidation);
  return validationFn(
    value,
    values,
    fieldValidation['customArgs'],
    fieldValidation['message']
  ).then(checkValidationResult);
};

// Sequentially resolve promises with reduce: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// Example run promises until one succeeds: https://gist.github.com/greggman/0b6eafb335de4bbb557c
const iterateValidationsUntilFailOrAllSucceeded = (
  value: any,
  values: any,
  fieldValidations: FieldValidation[]
): Promise<ValidationResult> =>
  fieldValidations.reduce(
    (result, next) =>
      result.then((validationResult: ValidationResult) =>
        validationResult.succeeded
          ? fireValidation(value, values, next)
          : validationResult
      ),
    fireValidation(value, values, fieldValidations[0]) // Initial reduce value
  );

export const fireSingleFieldValidations = (
  values: any,
  value: any,
  fieldValidations: FieldValidation[]
): Promise<ValidationResult> =>
  arrayContainsEntries(fieldValidations)
    ? iterateValidationsUntilFailOrAllSucceeded(value, values, fieldValidations)
    : Promise.resolve(createDefaultValidationResult());
