import { FieldValidationFunctionSync } from '../model';
import { isValidPattern } from './pattern-helpers';

const VALIDATOR_TYPE = 'EMAIL';

let defaultMessage = 'Please enter a valid email address.';
export const setErrorMessage = message => (defaultMessage = message);

// RegExp from http://emailregex.com
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidField = (value): boolean => isValidPattern(value, EMAIL_PATTERN);

export const validator: FieldValidationFunctionSync = fieldValidatorArgs => {
  const { value, message = defaultMessage } = fieldValidatorArgs;

  const succeeded = isValidField(value);

  return {
    succeeded,
    message: (succeeded ? '' : message) as string,
    type: VALIDATOR_TYPE,
  };
};
