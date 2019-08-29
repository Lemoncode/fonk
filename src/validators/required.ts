import { FieldValidationFunctionSync, ValidationResult } from '../model';

let errorMessage = 'Please fill in this mandatory field.';

export const VALIDATOR_TYPE = 'REQUIRED';

export const setErrorMessage = (message: string) => {
  errorMessage = message;
};

export interface RequiredArgs {
  trim: boolean;
}

const DEFAULT_PARAMS: RequiredArgs = { trim: true };

const createDefaultValidationResult = (): ValidationResult => ({
  succeeded: true,
  type: VALIDATOR_TYPE,
  message: '',
});

const isStringValid = (value: string, trim: boolean): boolean => {
  return trim ? value.trim().length > 0 : value.length > 0;
};

const isValidField = (value: any, trim: boolean): boolean => {
  return typeof value === 'string'
    ? isStringValid(value, trim)
    : value === true || typeof value === 'number';
};

export const required: FieldValidationFunctionSync = (
  value,
  values,
  customArgs: RequiredArgs = DEFAULT_PARAMS,
  customMessage
) => {
  if (!customArgs) {
    customArgs = DEFAULT_PARAMS;
  }

  const validationResult: ValidationResult = createDefaultValidationResult();
  const isValid = isValidField(value, Boolean(customArgs.trim));

  validationResult.succeeded = isValid;
  validationResult.message = (customMessage
    ? customMessage
    : errorMessage) as string;

  return validationResult;
};
