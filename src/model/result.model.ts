export interface ValidationResult {
  type: string;
  succeeded: boolean;
  message: string;
}

export const createDefaultValidationResult = (): ValidationResult => ({
  type: '',
  succeeded: true,
  message: '',
});

export interface InternalValidationResult {
  key: string;
  type: string;
  succeeded: boolean;
  message: string;
  arrayErrors?: { [fieldId: string]: ValidationResult }[];
}

export const createDefaultInternalValidationResult = (): InternalValidationResult => ({
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

export interface InternalFormValidationResult {
  succeeded: boolean;
  fieldErrors: { [fieldId: string]: InternalValidationResult };
  recordErrors: { [recordId: string]: ValidationResult };
}

export interface FormValidationResult {
  succeeded: boolean;
  fieldErrors: {
    [fieldId: string]:
      | ValidationResult
      | { [fieldId: string]: ValidationResult }[];
  };
  recordErrors: { [recordId: string]: ValidationResult };
}

export const createDefaultFormValidationResult = (): FormValidationResult => ({
  succeeded: true,
  fieldErrors: {},
  recordErrors: {},
});

export const createDefaultInternalFormValidationResult = (): InternalFormValidationResult => ({
  succeeded: true,
  fieldErrors: {},
  recordErrors: {},
});
