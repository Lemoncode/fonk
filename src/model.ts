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
  customArgs?: object,
  message?: string | string[]
) => ValidationResult;

export type FieldValidationFunction = (
  value: any,
  values?: any,
  customParams?: object,
  message?: string | string[]
) => Promise<ValidationResult>;

export type FieldValidationFunctionSyncAsync =
  | FieldValidationFunction
  | FieldValidationFunctionSync;

export interface FullFieldValidation {
  validator: FieldValidationFunction;
  customArgs?: object;
  message?: string | string[];
}

export type FieldValidation = FieldValidationFunction | FullFieldValidation;

export interface FormValidation {
  succeeded: boolean;
  fieldErrors: { [key: string]: ValidationResult };
  formGlobalErrors: Array<ValidationResult>;
}

export type RecordValidationFunctionSyncAsync = (
  values: any,
  message?: string | string[]
) => ValidationResult | Promise<ValidationResult>;

export type RecordValidationFunction = (
  values: any,
  message?: string | string[]
) => Promise<ValidationResult>;

export interface FieldsValidationSchema {
  [key: string]: FieldValidation[];
}

export interface RecordValidationSchema {
  validation: RecordValidationFunction;
  message?: string;
}

export interface ValidationSchema {
  global?: RecordValidationSchema[];
  fields?: FieldsValidationSchema;
}
