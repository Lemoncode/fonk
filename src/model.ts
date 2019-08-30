export interface ValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  message: string;
}

export const createDefaultValidationResult = (): ValidationResult => ({
  key: '',
  type: '',
  succeeded: true,
  message: '',
});

export interface FormFieldError {
  key: string;
  validationResult: ValidationResult;
}

export interface FormValidationResult {
  succeeded: boolean;
  fieldErrors: FormFieldError[];
  recordErrors: ValidationResult[];
}

export const createDefaultFormValidationSummary = (): FormValidationResult => ({
  succeeded: true,
  fieldErrors: [],
  recordErrors: [],
});

// Pending on ValidationEngine
type ValidationResultSyncAsync = ValidationResult | Promise<ValidationResult>;

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

export type FieldValidation =
  | FieldValidationFunctionSyncAsync
  | FullFieldValidation;

export interface FormValidation {
  succeeded: boolean;
  fieldErrors: { [key: string]: ValidationResult };
  recordErrors: ValidationResult[];
}

export type RecordValidationFunctionSyncAsync =
  | RecordValidationFunctionSync
  | RecordValidationFunctionAsync;

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

export interface FieldsValidationSchema {
  [key: string]: FieldValidation[];
}

export interface RecordValidationFull {
  validation: RecordValidationFunctionSyncAsync;
  message?: string;
}

export type RecordValidationSchema =
  | RecordValidationFull
  | RecordValidationFunctionSyncAsync;

export interface ValidationSchema {
  record?: RecordValidationSchema[];
  fields?: FieldsValidationSchema;
}
