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

export interface FormValidationSummary {
  succeeded: boolean;
  fieldErrors: FormFieldError[];
  formGlobalErrors: ValidationResult[];
}

export const createDefaultFormValidationSummary = (): FormValidationSummary => ({
  succeeded: true,
  fieldErrors: [],
  formGlobalErrors: [],
});

// Pending on ValidationEngine
type ValidationResultSyncAsync = ValidationResult | Promise<ValidationResult>;

export type FieldValidationFunction = (
  value: any,
  values?: any,
  customParams?: any
) => Promise<ValidationResult>;

export interface FullFieldValidation {
  validator: FieldValidationFunction;
  customArgs?: object;
  errorMessage: string | string[];
}

export type FieldValidation = FieldValidationFunction | FullFieldValidation;

export interface FormValidation {
  succeeded: boolean;
  fieldErrors: { [key: string]: ValidationResult };
  formGlobalErrors: Array<ValidationResult>;
}

export type RecordValidationFunction = (
  values: any
) => Promise<ValidationResult>;

export interface ValidationSchema {
  global?: RecordValidationFunction[];
  fields?: { [key: string]: FieldValidation[] };
}
