import {
  FieldValidationFunctionSyncAsync,
  FieldValidationFunction,
  ValidationResult,
  RecordValidationFunctionSyncAsync,
  RecordValidationFunction,
} from '../model';
import { isPromise } from '../helper';

// TODO: add unit tests

export const convertFieldValidationToAsyncIfNeeded = (
  validation: FieldValidationFunctionSyncAsync
): FieldValidationFunction => {
  // Sugar we admit both flavors syncrhonous and asynchronous validators
  return (
    value: any,
    values: any,
    customParams?: object,
    message?: string | string[]
  ): Promise<ValidationResult> => {
    const result = validation(value, values, customParams, message);

    return isPromise(result) ? result : Promise.resolve(result);
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

    return isPromise(result) ? result : Promise.resolve(result);
  };
};
