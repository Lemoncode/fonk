import {
  FieldValidationFunctionSyncAsync,
  FullFieldValidation,
} from './field-validator.model';
import {
  RecordValidationFunctionSyncAsync,
  FullRecordValidation,
} from './record-validator.model';

export type FieldValidation =
  | FieldValidationFunctionSyncAsync
  | FullFieldValidation;

export interface FieldValidationSchema {
  [fieldId: string]: FieldValidation[];
}

export type RecordValidation =
  | RecordValidationFunctionSyncAsync
  | FullRecordValidation;

export interface RecordValidationSchema {
  [recordId: string]: RecordValidation[];
}

export interface ValidationSchema {
  fields?: FieldValidationSchema;
  records?: RecordValidationSchema;
}
