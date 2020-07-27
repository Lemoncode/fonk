import { ValidationResult } from './result.model';

interface RecordValidatorArgs {
  values: any;
  message?: string | string[];
}

/**
 *  **Arguments**
 * - recordValidatorArgs: We pass here information like values and/or message.
 *
 * **Returns**
 * - **ValidationResult**: Whether if field validations applied to the selected field succeeded or not (in casenot additional information to be provided like id of the validator that failed plus error message).
 */
export type RecordValidationFunctionSync = (
  recordValidatorArgs: RecordValidatorArgs
) => ValidationResult;

/**
 *  **Arguments**
 * - recordValidatorArgs: We pass here information like values and/or message.
 *
 * **Returns**
 * - **Promise<ValidationResult>**: Async promise, once promise is resolved returns wether if field validations applied to the selected field succeeded or not (in casenot additional information to be provided like id of the validator that failed plus error message).
 */
export type RecordValidationFunctionAsync = (
  recordValidatorArgs: RecordValidatorArgs
) => Promise<ValidationResult>;

export type RecordValidationFunctionSyncAsync =
  | RecordValidationFunctionSync
  | RecordValidationFunctionAsync;

export interface FullRecordValidation {
  validator:
    | RecordValidationFunctionSyncAsync
    | { validator: RecordValidationFunctionSyncAsync };
  message?: string | string[];
}
