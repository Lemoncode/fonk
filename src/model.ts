export interface ValidationResult {
  key?: string;
  type: string;
  succeeded: boolean;
  message: string;
}

// Since is an interface no way to use instanceof
// Using type guard
export const isSyncValidationResult = (
  validationResult: ValidationResultSyncAsync
): validationResult is ValidationResult =>
  (validationResult as Promise<ValidationResult>).then === void 0;

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
  formGlobalErrors: ValidationResult[];
}

export const createDefaultFormValidationSummary = (): FormValidationResult => ({
  succeeded: true,
  fieldErrors: [],
  formGlobalErrors: [],
});

// Pending on ValidationEngine
type ValidationResultSyncAsync = ValidationResult | Promise<ValidationResult>;

type FieldValidationFunctionSync = (
  value: any,
  values?: any,
  customParams?: any
) => ValidationResult;

export type FieldValidationFunction = (
  value: any,
  values?: any,
  customParams?: any
) => Promise<ValidationResult>;

export type FieldValidationFunctionSyncAsync =
  | FieldValidationFunction
  | FieldValidationFunctionSync;

export interface FullFieldValidation {
  validator: FieldValidationFunction;
  customArgs?: object;
  errorMessage?: string | string[];
}

export type FieldValidation = FieldValidationFunction | FullFieldValidation;

export interface FormValidation {
  succeeded: boolean;
  fieldErrors: { [key: string]: ValidationResult };
  formGlobalErrors: Array<ValidationResult>;
}

export type RecordValidationFunctionSyncAsync = (
  value
) => ValidationResult | Promise<ValidationResult>;

export type RecordValidationFunction = (
  values: any
) => Promise<ValidationResult>;

export interface FieldsValidationSchema {
  [key: string]: FieldValidation[];
}

export interface ValidationSchema {
  global?: RecordValidationFunction[];
  fields?: FieldsValidationSchema;
}
