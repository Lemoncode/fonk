import {
  FieldValidationFunctionSyncAsync,
  FullFieldValidation,
} from './field-validator.model';
import {
  RecordValidationFunctionSyncAsync,
  FullRecordValidation,
} from './record-validator.model';

type FieldValidation = FieldValidationFunctionSyncAsync | FullFieldValidation;

export interface FieldValidationSchema {
  [fieldId: string]: FieldValidation[];
}

type RecordValidation =
  | RecordValidationFunctionSyncAsync
  | FullRecordValidation;

export interface RecordValidationSchema {
  [recordId: string]: RecordValidation[];
}

/**
 * In this structure we can define all the validations associated to a given form (field and record validations).
 * This allow us to define all validation associated to a given form in a declarative way.
 * Properties:
 *
 * - **field**: optional entry, here we can define all field validations associated to a given form
 *
 * - **record**: optional entry, here we can define all record validations associated to a given form
 */
export interface ValidationSchema {
  field?: FieldValidationSchema;
  record?: RecordValidationSchema;
}
