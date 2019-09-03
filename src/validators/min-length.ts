import { LengthArgs, parseLengthParams, isLengthValid } from './length';
import { FieldValidationFunctionSync } from '../model';

const VALIDATOR_TYPE = 'MIN_LENGTH';

let defaultMessage = 'The value provided does not fulfill min length';
export const setErrorMessage = message => (defaultMessage = message);

const BAD_PARAMETER =
  'FieldValidationError: Parameter "length" for minLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.';

const DEFAULT_PARAMS: LengthArgs = null;

const isStringLengthValid = (value: string, length: number): boolean =>
  value.length >= length;

export const validator: FieldValidationFunctionSync = fieldValidatorArgs => {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER);
  }

  const {
    value,
    customArgs = DEFAULT_PARAMS as LengthArgs,
    message = defaultMessage,
  } = fieldValidatorArgs;

  const length = parseLengthParams(customArgs, BAD_PARAMETER);
  const succeeded = isLengthValid(value, length, isStringLengthValid);

  return {
    succeeded,
    message: (succeeded ? '' : message) as string,
    type: VALIDATOR_TYPE,
  };
};
