import { DefaultFieldIdType, DefaultRecordIdType } from './common';
import {
  FieldValidationFunctionSyncAsync,
  FullFieldValidation,
} from './field-validator';
import {
  RecordValidationFunctionSyncAsync,
  FullRecordValidation,
} from './record-validator';

type FieldValidation = FieldValidationFunctionSyncAsync | FullFieldValidation;

type RecordValidation =
  | RecordValidationFunctionSyncAsync
  | FullRecordValidation;

/**
 * In this structure we can define all the validations associated to a given form (field and record validations).
 * This allow us to define all validation associated to a given form in a declarative way.
 * Properties:
 *
 * - **field**: optional entry, here we can define all field validations associated to a given form
 *
 * - **record**: optional entry, here we can define all record validations associated to a given form
 */
export interface ValidationSchema<
  F extends DefaultFieldIdType = string,
  R extends DefaultRecordIdType = string
> {
  field?: Record<F, FieldValidation[]>;
  record?: Record<R, RecordValidation[]>;
}
