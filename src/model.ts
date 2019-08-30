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

export type FieldValidationFunctionSync = (
  value: any,
  values?: any,
  customArgs?: any,
  message?: string | string[]
) => ValidationResult;

export type FieldValidationFunctionAsync = (
  value: any,
  values?: any,
  customArgs?: any,
  message?: string | string[]
) => Promise<ValidationResult>;

export type FieldValidationFunctionSyncAsync =
  | FieldValidationFunctionAsync
  | FieldValidationFunctionSync;

export interface FullFieldValidationAsync {
  validator: FieldValidationFunctionAsync;
  customArgs?: any;
  message?: string | string[];
}

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
  recordErrors: Array<ValidationResult>;
}

export type RecordValidationFunctionSyncAsync =
  | RecordValidationFunctionSync
  | RecordValidationFunctionAsync;

export type RecordValidationFunctionSync = (
  values: any,
  message?: string | string[]
) => ValidationResult;

export type RecordValidationFunctionAsync = (
  values: any,
  message?: string | string[]
) => Promise<ValidationResult>;

export interface FullFieldValidationSchemaAsync {
  [key: string]: FullFieldValidationAsync[];
}

export interface FieldsValidationSchema {
  [key: string]: FieldValidation[];
}

export interface FullRecordValidationAsync {
  validation: RecordValidationFunctionAsync;
  message?: string;
}

export interface FullRecordValidation {
  validation: RecordValidationFunctionSyncAsync;
  message?: string;
}

export type FullRecordValidationSchemaAsync = FullRecordValidationAsync;

export type RecordValidationSchema =
  | FullRecordValidation
  | RecordValidationFunctionSyncAsync;

export interface ValidationSchema {
  record?: RecordValidationSchema[];
  fields?: FieldsValidationSchema;
}
