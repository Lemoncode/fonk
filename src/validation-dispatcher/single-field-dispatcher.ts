import {
  ValidationResult,
  createDefaultValidationResult,
  InternalFieldValidation,
} from '../model';
import { arrayContainsEntries, isUndefinedOrNull } from '../helper';

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
  internalFieldValidation: InternalFieldValidation
): Promise<ValidationResult> =>
  internalFieldValidation
    .validator({
      value,
      values,
      customArgs: internalFieldValidation.customArgs,
      message: internalFieldValidation.message,
    })
    .then(checkValidationResult);

// Sequentially resolve promises with reduce: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// Example run promises until one succeeds: https://gist.github.com/greggman/0b6eafb335de4bbb557c
const iterateValidationsUntilFailOrAllSucceeded = (
  value: any,
  values: any,
  internalFieldValidations: InternalFieldValidation[]
): Promise<ValidationResult> =>
  internalFieldValidations.reduce(
    (result, next) =>
      result.then((validationResult: ValidationResult) =>
        validationResult.succeeded
          ? fireValidation(value, values, next)
          : validationResult
      ),
    fireValidation(value, values, internalFieldValidations[0]) // Initial reduce value
  );

export const fireSingleFieldValidations = (
  value: any,
  values: any,
  internalFieldValidations: InternalFieldValidation[]
): Promise<ValidationResult> =>
  arrayContainsEntries(internalFieldValidations)
    ? iterateValidationsUntilFailOrAllSucceeded(
        value,
        values,
        internalFieldValidations
      )
    : Promise.resolve(createDefaultValidationResult());
