import { LengthArgs, parseLengthParams, isLengthValid } from './length';
import { FieldValidationFunctionSync } from '../model';

export const VALIDATOR_TYPE = 'MAX_LENGTH';

let defaultMessage = 'The value provided does not fulfill max length';
export const setErrorMessage = message => (defaultMessage = message);

const BAD_PARAMETER =
  'FieldValidationError: Parameter "length" for maxLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.';

const DEFAULT_PARAMS: LengthArgs = null;

function isStringLengthValid(value: string, length: number): boolean {
  return value.length <= length;
}

export const maxLength: FieldValidationFunctionSync = fieldValidatorArgs => {
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
