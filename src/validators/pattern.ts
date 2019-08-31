import { FieldValidationFunctionSync } from '../model';

export const VALIDATOR_TYPE = 'PATTERN';
const DEFAULT_MESSAGE = 'Please provide a valid format.';
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

function isEmptyValue(value) {
  return value === null || value === undefined || value === '';
}

export function isValidField(value, pattern: RegExp): boolean {
  return isEmptyValue(value) ? true : pattern.test(value);
}

export const pattern: FieldValidationFunctionSync = fieldValidatorArgs => {
  if (!fieldValidatorArgs.customArgs) {
    throw new Error(BAD_PARAMETER);
  }
  const {
    value,
    customArgs = DEFAULT_PARAMS as PatternArgs,
    message = DEFAULT_MESSAGE,
  } = fieldValidatorArgs;

  const pattern = parsePattern(customArgs);
  const succeeded = isValidField(value, pattern);

  return {
    succeeded,
    message: (succeeded ? '' : message) as string,
    type: VALIDATOR_TYPE,
  };
};
