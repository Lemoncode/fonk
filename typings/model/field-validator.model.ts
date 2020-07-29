import { ValidationResult } from './result.model';

interface FieldValidatorArgs<CustomArgs> {
  value: any;
  values?: any;
  customArgs?: CustomArgs;
  message?: string | string[];
}

/**
 *  **Arguments**
 * - fieldValidatorArgs: We pass here information like id of the field to validate, actual value, values and customArgs.
 *
 * **Returns**
 * - **ValidationResult**: Whether if field validations applied to the selected field succeeded or not (in casenot additional information to be provided like id of the validator that failed plus error message).
 */
export type FieldValidationFunctionSync<CustomArgs = {}> = (
  fieldValidatorArgs: FieldValidatorArgs<CustomArgs>
) => ValidationResult;

/**
 *  **Arguments**
 * - fieldValidatorArgs: We pass here information like id of the field to validate, actual value, values and customArgs.
 *
 * **Returns**
 * - **Promise<ValidationResult>**: Async promise, once promise is resolved returns wether if field validations applied to the selected field succeeded or not (in casenot additional information to be provided like id of the validator that failed plus error message).
 */
export type FieldValidationFunctionAsync<CustomArgs = {}> = (
  fieldValidatorArgs: FieldValidatorArgs<CustomArgs>
) => Promise<ValidationResult>;

export type FieldValidationFunctionSyncAsync =
  | FieldValidationFunctionAsync
  | FieldValidationFunctionSync;

export interface FullFieldValidation {
  validator:
    | FieldValidationFunctionSyncAsync
    | { validator: FieldValidationFunctionSyncAsync };
  customArgs?: any;
  message?: string | string[];
}
