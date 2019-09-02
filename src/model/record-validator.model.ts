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

export interface InternalRecordValidation {
  validator: RecordValidationFunctionAsync;
  message?: string | string[];
}

export type InternalRecordValidationSchema = {
  [recordId: string]: InternalRecordValidation[];
};
