import { ValidationResult } from './result.model';

export interface RecordValidatorArgs {
  value: any;
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
  validation: RecordValidationFunctionSyncAsync;
  message?: string;
}

// FullRecordValidationAsync
export interface InternalRecordValidation {
  validation: RecordValidationFunctionAsync;
  message?: string;
}

// FullRecordValidationSchemaAsync
export type InternalRecordValidationSchema = {
  [key: string]: InternalRecordValidation;
};
