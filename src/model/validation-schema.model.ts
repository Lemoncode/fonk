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
  [key: string]: FieldValidation[];
}

export type RecordValidation =
  | RecordValidationFunctionSyncAsync
  | FullRecordValidation;

export interface RecordValidationSchema {
  [key: string]: RecordValidation[];
}

export interface ValidationSchema {
  fields?: FieldValidationSchema;
  records?: RecordValidationSchema;
}
