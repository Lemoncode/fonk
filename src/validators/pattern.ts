import { FieldValidationFunctionSync } from '../model';
import { isValidPattern } from './pattern-helpers';

const VALIDATOR_TYPE = 'PATTERN';

let defaultMessage = 'Please provide a valid format.';
export const setErrorMessage = message => (defaultMessage = message);

export interface PatternArgs {
  pattern: string | RegExp;
}

const BAD_PARAMETER =
  'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /d+/ }.';
const DEFAULT_PARAMS: PatternArgs = null;

function getRegExp(pattern): RegExp {
  return pattern instanceof RegExp ? pattern : new RegExp(pattern);
}

function parsePattern({ pattern }: PatternArgs): RegExp {
  // Avoid RegExp like /true/ /false/ and /null/ without an explicit "true", "false" or "null"
  if (typeof pattern === 'boolean' || pattern === null) {
    throw new Error(BAD_PARAMETER);
  }
  return getRegExp(pattern);
}

export const validator: FieldValidationFunctionSync = fieldValidatorArgs => {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER);
  }
  const {
    value,
    customArgs = DEFAULT_PARAMS as PatternArgs,
    message = defaultMessage,
  } = fieldValidatorArgs;

  const pattern = parsePattern(customArgs);
  const succeeded = isValidPattern(value, pattern);

  return {
    succeeded,
    message: succeeded ? '' : message,
    type: VALIDATOR_TYPE,
  };
};
