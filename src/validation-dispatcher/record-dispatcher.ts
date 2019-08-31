import {
  ValidationResult,
  createDefaultValidationResult,
  InternalRecordValidation,
} from '../model';
import { arrayContainsEntries, isUndefinedOrNull } from '../helper';

const checkValidationResult = (
  validationResult: ValidationResult
): ValidationResult => {
  let result: ValidationResult = validationResult;

  if (!validationResult || isUndefinedOrNull(validationResult.succeeded)) {
    // show a console error, warn the user one of his validators is not well formed
    console.error(
      'form-validators: One of the record validator is returning a non expected value.'
    );
    result = createDefaultValidationResult();
  }

  return result;
};

const fireValidation = (
  values,
  internalRecordValidation: InternalRecordValidation
): Promise<ValidationResult> =>
  internalRecordValidation
    .validator({
      values,
      message: internalRecordValidation.message,
    })
    .then(checkValidationResult);

// Sequentially resolve promises with reduce: https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/
// Example run promises until one succeeds: https://gist.github.com/greggman/0b6eafb335de4bbb557c
const iterateValidationsUntilFailOrAllSucceeded = (
  values: any,
  internalRecordValidations: InternalRecordValidation[]
): Promise<ValidationResult> =>
  internalRecordValidations.reduce(
    (result, next) =>
      result.then((validationResult: ValidationResult) =>
        validationResult.succeeded
          ? fireValidation(values, next)
          : validationResult
      ),
    fireValidation(values, internalRecordValidations[0]) // Initial reduce value
  );

export const fireSingleRecordValidations = (
  values: any,
  internalRecordValidations: InternalRecordValidation[]
): Promise<ValidationResult> =>
  arrayContainsEntries(internalRecordValidations)
    ? iterateValidationsUntilFailOrAllSucceeded(
        values,
        internalRecordValidations
      )
    : Promise.resolve(createDefaultValidationResult());
