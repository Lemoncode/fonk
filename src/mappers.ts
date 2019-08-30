import {
  FieldValidationFunctionSyncAsync,
  FieldValidationFunctionAsync,
  ValidationResult,
  RecordValidationFunctionSyncAsync,
  RecordValidationFunctionAsync,
  createDefaultValidationResult,
} from './model';
import { isPromise } from './helper';

// Sugar we admit both flavors syncrhonous and asynchronous validators
export const convertFieldValidationToAsyncIfNeeded = (
  validation: FieldValidationFunctionSyncAsync
): FieldValidationFunctionAsync => (
  value: any,
  values: any,
  customArgs?: any,
  message?: string | string[]
): Promise<ValidationResult> => {
  const result = validation
    ? validation(value, values, customArgs, message)
    : createDefaultValidationResult();

  return isPromise(result) ? result : Promise.resolve(result);
};

export const convertRecordValidationToAsyncIfNeeded = (
  validation: RecordValidationFunctionSyncAsync
): RecordValidationFunctionAsync => (
  values: any,
  message?: string | string[]
): Promise<ValidationResult> => {
  const result = validation
    ? validation(values, message)
    : createDefaultValidationResult();

  return isPromise(result) ? result : Promise.resolve(result);
};
