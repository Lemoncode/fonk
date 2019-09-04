import {
  FieldValidationFunctionSyncAsync,
  FullFieldValidation,
} from './field-validator.model';
import {
  RecordValidationFunctionSyncAsync,
  FullRecordValidation,
} from './record-validator.model';

type FieldValidation = FieldValidationFunctionSyncAsync | FullFieldValidation;

interface FieldValidationSchema {
  [fieldId: string]: FieldValidation[];
}

type RecordValidation =
  | RecordValidationFunctionSyncAsync
  | FullRecordValidation;

interface RecordValidationSchema {
  [recordId: string]: RecordValidation[];
}

/**
 * Comments
 */
export interface ValidationSchema {
  field?: FieldValidationSchema;
  record?: RecordValidationSchema;
}
