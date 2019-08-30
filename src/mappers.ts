import {
  FieldValidationFunctionSyncAsync,
  FieldValidationFunctionAsync,
  ValidationResult,
  RecordValidationFunctionSyncAsync,
  RecordValidationFunctionAsync,
  createDefaultValidationResult,
  FieldValidatorArgs,
  RecordValidatorArgs,
} from './model';
import { isPromise } from './helper';

// Sugar we admit both flavors syncrhonous and asynchronous validators
export const convertFieldValidationToAsyncIfNeeded = (
  validation: FieldValidationFunctionSyncAsync
): FieldValidationFunctionAsync => (
  fieldValidatorArgs: FieldValidatorArgs
): Promise<ValidationResult> => {
  const result = validation
    ? validation(fieldValidatorArgs)
    : createDefaultValidationResult();

  return isPromise(result) ? result : Promise.resolve(result);
};

export const convertRecordValidationToAsyncIfNeeded = (
  validation: RecordValidationFunctionSyncAsync
): RecordValidationFunctionAsync => (
  recordValidatorArgs: RecordValidatorArgs
): Promise<ValidationResult> => {
  const result = validation
    ? validation(recordValidatorArgs)
    : createDefaultValidationResult();

  return isPromise(result) ? result : Promise.resolve(result);
};
