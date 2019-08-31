import { ValidationResult } from './result.model';

export interface RecordValidatorArgs {
  values: any;
  message?: string | string[];
}

export type RecordValidationFunctionSync = (
  recordValidatorArgs: RecordValidatorArgs
) => ValidationResult;

export type RecordValidationFunctionAsync = (
  recordValidatorArgs: RecordValidatorArgs
) => Promise<ValidationResult>;

export type RecordValidationFunctionSyncAsync =
  | RecordValidationFunctionSync
  | RecordValidationFunctionAsync;

export interface FullRecordValidation {
  validator: RecordValidationFunctionSyncAsync;
  message?: string | string[];
}

// FullRecordValidationAsync
export interface InternalRecordValidation {
  validator: RecordValidationFunctionAsync;
  message?: string | string[];
}

// FullRecordValidationSchemaAsync
export type InternalRecordValidationSchema = {
  [key: string]: InternalRecordValidation[];
};
