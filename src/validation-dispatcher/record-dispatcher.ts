import {
  ValidationResult,
  RecordValidationSchema,
  RecordValidationFunctionAsync,
} from '../model';
import { isFunction } from '../helper';
import { convertRecordValidationToAsyncIfNeeded } from '../mapper';

const getValidationFn = (
  recordValidation: RecordValidationSchema
): RecordValidationFunctionAsync => {
  if (!recordValidation) return null;

  const validationFn = isFunction(recordValidation)
    ? recordValidation
    : recordValidation.validation;

  return convertRecordValidationToAsyncIfNeeded(validationFn);
};

export const areAllRecordValidationsDefined = (
  validationSchemaCollection: RecordValidationSchema[]
): boolean =>
  validationSchemaCollection.every(
    validationSchema => validationSchema && getValidationFn(validationSchema)
  );

export const fireRecordValidations = (
  values: any,
  validations: RecordValidationSchema[]
): Promise<ValidationResult>[] => {
  let validationResultsPromises: Promise<ValidationResult>[] = [];

  if (areAllRecordValidationsDefined(validations)) {
    validationResultsPromises = validations.map(validation => {
      const validationFn = getValidationFn(validation);

      return validationFn(values, validation['message']);
    });
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
