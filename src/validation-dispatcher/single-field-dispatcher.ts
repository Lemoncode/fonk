import {
  InternalValidationResult,
  createDefaultInternalValidationResult,
  InternalFieldValidation,
  NativeEventType,
} from '../model';
import { arrayContainsEntries, isUndefinedOrNull } from '../helper';

const checkValidationResult = (
  validationResult: InternalValidationResult
): InternalValidationResult => {
  let result: InternalValidationResult = validationResult;

  if (!validationResult || isUndefinedOrNull(validationResult.succeeded)) {
    // show a console error, warn the user one of his validators is not well formed
    console.error(
      'form-validators: One of the field validator is returning a non expected value.'
    );
    result = createDefaultInternalValidationResult();
  }

  return result;
};

const fireValidation = (
  value,
  values,
  internalFieldValidation: InternalFieldValidation
): Promise<InternalValidationResult> =>
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
): Promise<InternalValidationResult> =>
  internalFieldValidations.reduce(
    (result, next) =>
      result.then((validationResult: InternalValidationResult) =>
        validationResult.succeeded
          ? fireValidation(value, values, next)
          : validationResult
      ),
    fireValidation(value, values, internalFieldValidations[0]) // Initial reduce value
  );

const filterFieldValidations = (
  eventType: NativeEventType,
  internalFieldValidations: InternalFieldValidation[]
) =>
  internalFieldValidations.filter(
    v => !arrayContainsEntries(v.events) || v.events.includes(eventType)
  );

// TODO: Add unit tests
export const fireSingleFieldValidations = (
  value: any,
  values: any,
  eventType: NativeEventType,
  internalFieldValidations: InternalFieldValidation[]
): Promise<InternalValidationResult> =>
  arrayContainsEntries(internalFieldValidations)
    ? iterateValidationsUntilFailOrAllSucceeded(
        value,
        values,
        filterFieldValidations(eventType, internalFieldValidations)
      )
    : Promise.resolve(createDefaultInternalValidationResult());
