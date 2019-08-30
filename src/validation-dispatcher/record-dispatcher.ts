import {
  ValidationResult,
  RecordValidationSchema,
  RecordValidationFunctionAsync,
} from '../model';
import { isFunction } from '../helper';
import { convertRecordValidationToAsyncIfNeeded } from '../mappers';

const getValidationFn = (
  recordValidation: RecordValidationSchema
): RecordValidationFunctionAsync => {
  if (!recordValidation) return null;

  let recordValidationFunction: RecordValidationFunctionAsync = null;

  if (isFunction(recordValidation)) {
    recordValidationFunction = convertRecordValidationToAsyncIfNeeded(
      recordValidation
    );
  } else {
    if (recordValidation.validation) {
      recordValidationFunction = convertRecordValidationToAsyncIfNeeded(
        recordValidation.validation
      );
    }
  }

  return recordValidationFunction;
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

      return validationFn({ value: values, message: validation['message'] });
    });
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
