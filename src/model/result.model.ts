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

export interface RecordValidationResult {
  succeeded: boolean;
  recordErrors: { [recordId: string]: ValidationResult };
}

export const createDefaultRecordValidationResult = (): RecordValidationResult => ({
  succeeded: true,
  recordErrors: {},
});

export interface FormValidationResult {
  succeeded: boolean;
  fieldErrors: { [fieldId: string]: ValidationResult };
  recordErrors: { [recordId: string]: ValidationResult };
}

export const createDefaultFormValidationResult = (): FormValidationResult => ({
  succeeded: true,
  fieldErrors: {},
  recordErrors: {},
});
