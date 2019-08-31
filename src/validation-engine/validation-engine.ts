import {
  InternalFieldValidationSchema,
  createDefaultValidationResult,
  ValidationResult,
  InternalRecordValidationSchema,
  RecordValidationResult,
  FormValidationResult,
} from '../model';
import {
  fireSingleFieldValidations,
  fireAllFieldsValidations,
  fireSingleRecordValidations,
  fireAllRecordsValidations,
} from '../validation-dispatcher';
import {
  buildFormValidationResult,
  buildRecordValidationResult,
} from '../form-validation-summary-builder';
import { isUndefinedOrNull } from '../helper';

const isIdInSchema = (fieldId: string, schema): boolean =>
  !isUndefinedOrNull(schema[fieldId]);

export const validateField = (
  fieldId: string,
  value: any,
  values: any,
  schema: InternalFieldValidationSchema
): Promise<ValidationResult> =>
  !isIdInSchema(fieldId, schema)
    ? Promise.resolve(createDefaultValidationResult())
    : fireSingleFieldValidations(value, values, schema[fieldId]).catch(
        error => {
          const message = `Validation Exception, field: ${fieldId}`;
          console.error(message);
          throw error;
        }
      );

const validateRecord = (
  recordId: string,
  values: any,
  schema: InternalRecordValidationSchema
): Promise<ValidationResult> =>
  !isIdInSchema(recordId, schema)
    ? Promise.resolve(createDefaultValidationResult())
    : fireSingleRecordValidations(values, schema[recordId]).catch(error => {
        const message = `Validation Exception, record: ${recordId}`;
        console.error(message);
        throw error;
      });

export const validateRecords = (
  values: any,
  schema: InternalRecordValidationSchema
): Promise<RecordValidationResult> => {
  const promiseValidationResults = fireAllRecordsValidations(
    Object.keys(schema),
    values,
    schema,
    validateRecord
  );

  return Promise.all(promiseValidationResults)
    .then(validationResults => buildRecordValidationResult(validationResults))
    .catch(error => {
      const message = 'Uncontrolled error validating records';
      console.error(message);
      throw error;
    });
};

export const validateForm = (
  values: any,
  fieldSchema: InternalFieldValidationSchema,
  recordSchema: InternalRecordValidationSchema
): Promise<FormValidationResult> => {
  const promiseFieldValidationResults = fireAllFieldsValidations(
    Object.keys(fieldSchema),
    values,
    fieldSchema,
    validateField
  );

  const promiseRecordValidationResults = fireAllRecordsValidations(
    Object.keys(recordSchema),
    values,
    recordSchema,
    validateRecord
  );

  return Promise.all(promiseFieldValidationResults)
    .then(fieldValidationResults =>
      Promise.all(promiseRecordValidationResults).then(
        recordValidationResults => [
          fieldValidationResults,
          recordValidationResults,
        ]
      )
    )
    .then(([fieldValidationResults, recordValidationResults]) =>
      buildFormValidationResult(fieldValidationResults, recordValidationResults)
    )
    .catch(error => {
      const message = 'Uncontrolled error validating records';
      console.error(message);
      throw error;
    });
};
