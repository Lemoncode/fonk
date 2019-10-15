import { get } from '../helpers';
import {
  InternalValidationResult,
  InternalFieldValidationSchema,
  InternalRecordValidationSchema,
} from '../model';

export const fireAllFieldsValidations = (
  fieldIds: string[],
  values: any,
  schema: InternalFieldValidationSchema,
  validateField: (
    fieldId: string,
    value: any,
    values: any,
    schema: InternalFieldValidationSchema
  ) => Promise<InternalValidationResult>
): Promise<InternalValidationResult>[] =>
  fieldIds.map(fieldId =>
    validateField(fieldId, get(values, fieldId, undefined), values, schema)
  );

export const fireAllRecordsValidations = (
  recordIds: string[],
  values: any,
  schema: InternalRecordValidationSchema,
  validateRecord: (
    recordId: string,
    values: any,
    schema: InternalRecordValidationSchema
  ) => Promise<InternalValidationResult>
): Promise<InternalValidationResult>[] =>
  recordIds.map(recordId => validateRecord(recordId, values, schema));
