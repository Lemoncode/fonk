import { DefaultFieldIdType, DefaultRecordIdType } from './common';

export interface ValidationResult {
  type: string;
  succeeded: boolean;
  message: string;
}

export interface RecordValidationResult<
  R extends DefaultRecordIdType = string
> {
  succeeded: boolean;
  recordErrors: Record<R, ValidationResult>;
}

export interface FormValidationResult<
  F extends DefaultFieldIdType = string,
  R extends DefaultRecordIdType = string
> {
  succeeded: boolean;
  fieldErrors: Record<F, ValidationResult>;
  recordErrors: Record<R, ValidationResult>;
}
