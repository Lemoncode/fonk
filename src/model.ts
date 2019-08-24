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

// Pending on ValidationEngine
type ValidationResultSyncAsync = ValidationResult | Promise<ValidationResult>;

export type FieldValidationFunction = (
  value: any,
  values: any,
  customParams: any
) => Promise<ValidationResult>;

// renamoe to FullFieldValidation
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

export type RecordValidationFunction = (vm: any) => ValidationResult;

export interface ValidationSchema {
  global?: RecordValidationFunction[];
  fields?: { [key: string]: FieldValidation[] };
}
