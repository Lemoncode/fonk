import {
  FieldValidation,
  ValidationResult,
  createDefaultValidationResult,
} from '../model';
import { arrayContainsEntries, isFunction, isUndefinedOrNull } from '../helper';

const getValidationFn = (fieldValidation: FieldValidation) =>
  isFunction(fieldValidation) ? fieldValidation : fieldValidation.validator;

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
  return validationFn(value, values, fieldValidation['customArgs']).then(
    checkValidationResult
  );
};

const findFirstFailedValidation = (
  value: any,
  values: any,
  fieldValidations: FieldValidation[]
) =>
  fieldValidations.reduce(
    (result, next) =>
      result.then((validationResult: ValidationResult) =>
        validationResult.succeeded
          ? fireValidation(value, values, next)
          : validationResult
      ),
    fireValidation(value, values, fieldValidations[0])
  );

export const fireSingleFieldValidations = (
  values: any,
  value: any,
  fieldValidations: FieldValidation[]
): Promise<ValidationResult> =>
  arrayContainsEntries(fieldValidations)
    ? findFirstFailedValidation(value, values, fieldValidations)
    : Promise.resolve(createDefaultValidationResult());
