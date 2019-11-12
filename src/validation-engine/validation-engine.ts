import {
  InternalFieldValidationSchema,
  InternalRecordValidationSchema,
  InternalValidationResult,
  createDefaultInternalValidationResult,
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
import { isUndefinedOrNull, safeObjectKeys } from '../helpers';

const isIdInSchema = (fieldId: string, schema): boolean =>
  !isUndefinedOrNull(schema) && !isUndefinedOrNull(schema[fieldId]);

export const validateField = (
  fieldId: string,
  value: any,
  values: any,
  schema: InternalFieldValidationSchema
): Promise<InternalValidationResult> =>
  !isIdInSchema(fieldId, schema)
    ? Promise.resolve(createDefaultInternalValidationResult())
    : fireSingleFieldValidations(value, values, schema[fieldId])
        .then(validationResult => {
          validationResult.key = fieldId;
          return validationResult;
        })
        .catch(error => {
          const message = `Validation Exception, field: ${fieldId}`;
          console.error(message);
          throw error;
        });

const validateSingleRecord = (
  recordId: string,
  values: any,
  schema: InternalRecordValidationSchema
): Promise<InternalValidationResult> =>
  !isIdInSchema(recordId, schema)
    ? Promise.resolve(createDefaultInternalValidationResult())
    : fireSingleRecordValidations(values, schema[recordId])
        .then(validationResult => {
          validationResult.key = recordId;
          return validationResult;
        })
        .catch(error => {
          const message = `Validation Exception, record: ${recordId}`;
          console.error(message);
          throw error;
        });

export const validateRecord = (
  values: any,
  schema: InternalRecordValidationSchema
): Promise<RecordValidationResult> => {
  const promiseValidationResults = fireAllRecordsValidations(
    safeObjectKeys(schema),
    values,
    schema,
    validateSingleRecord
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
    safeObjectKeys(fieldSchema),
    values,
    fieldSchema,
    validateField
  );

  const promiseRecordValidationResults = fireAllRecordsValidations(
    safeObjectKeys(recordSchema),
    values,
    recordSchema,
    validateSingleRecord
  );

  return Promise.all(promiseFieldValidationResults)
    .then(fieldValidationResults =>
      Promise.all(
        promiseRecordValidationResults
      ).then(recordValidationResults => [
        fieldValidationResults,
        recordValidationResults,
      ])
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
