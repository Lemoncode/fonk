import {
  FieldValidationFunctionSyncAsync,
  FieldValidationFunction,
  ValidationResult,
  isSyncValidationResult,
  RecordValidationFunctionSyncAsync,
  RecordValidationFunction,
} from './model';

export const convertFieldValidationToAsyncIfNeeded = (
  validation: FieldValidationFunctionSyncAsync
): FieldValidationFunction => {
  // Sugar we admit both flavors syncrhonous and asynchronous validators
  return (
    value: any,
    values: any,
    customParams?: object,
    message?: string
  ): Promise<ValidationResult> => {
    const result = validation(value, values, customParams, message);

    if (isSyncValidationResult(result)) {
      return Promise.resolve(result as ValidationResult);
    } else {
      return result as Promise<ValidationResult>;
    }
  };
};

export const convertRecordValidationToAsyncIfNeeded = (
  validation: RecordValidationFunctionSyncAsync
): RecordValidationFunction => {
  return (
    values: any,
    message?: string | string[]
  ): Promise<ValidationResult> => {
    const result = validation(values, message);

    if (isSyncValidationResult(result)) {
      return Promise.resolve(result as ValidationResult);
    } else {
      return result as Promise<ValidationResult>;
    }
  };
};
