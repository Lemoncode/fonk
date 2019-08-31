import { FieldValidationFunctionSync } from '../model';

export const VALIDATOR_TYPE = 'REQUIRED';
const DEFAULT_MESSAGE = 'Please fill in this mandatory field.';
export interface RequiredArgs {
  trim: boolean;
}
const DEFAULT_PARAMS: RequiredArgs = { trim: true };

const isStringValid = (value: string, trim: boolean): boolean =>
  trim ? value.trim().length > 0 : value.length > 0;

const isNonStringValid = (value: any): boolean =>
  value !== void 0 && value !== null;

const isValidField = (value: any, trim: boolean): boolean =>
  typeof value === 'string'
    ? isStringValid(value, trim)
    : isNonStringValid(value);

export const required: FieldValidationFunctionSync = fieldValidatorArgs => {
  const {
    value,
    customArgs = DEFAULT_PARAMS as RequiredArgs,
    message = DEFAULT_MESSAGE,
  } = fieldValidatorArgs;

  const succeeded = isValidField(value, Boolean(customArgs.trim));

  return {
    succeeded,
    message: (succeeded ? '' : message) as string,
    type: VALIDATOR_TYPE,
  };
};
