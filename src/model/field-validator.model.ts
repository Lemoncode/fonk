import { ValidationResult } from './result.model';

export interface FieldValidatorArgs {
  value: any;
  values?: any;
  customArgs?: any;
  message?: string | string[];
}

export type FieldValidationFunctionSync = (
  fieldValidatorArgs: FieldValidatorArgs
) => ValidationResult;

export type FieldValidationFunctionAsync = (
  fieldValidatorArgs: FieldValidatorArgs
) => Promise<ValidationResult>;

export type FieldValidationFunctionSyncAsync =
  | FieldValidationFunctionAsync
  | FieldValidationFunctionSync;

export interface FullFieldValidation {
  validator: FieldValidationFunctionSyncAsync;
  customArgs?: any;
  message?: string | string[];
}

// FullFieldValidationAsync
export interface InternalFieldValidation {
  validator: FieldValidationFunctionAsync;
  customArgs?: any;
  message?: string | string[];
}

// FullFieldValidationSchemaAsync
export interface InternalFieldValidationSchema {
  [key: string]: InternalFieldValidation[];
}
