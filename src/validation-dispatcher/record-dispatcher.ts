import { ValidationResult, RecordValidationFunction } from '../model';
import { areAllElementsInArrayDefined } from '../helper';

export const fireRecordValidations = (
  values: any,
  validations: RecordValidationFunction[]
): Promise<ValidationResult>[] => {
  const validationResultsPromises: Promise<ValidationResult>[] = [];

  if (areAllElementsInArrayDefined(validations)) {
    validations.forEach(validationFn => {
      validationResultsPromises.push(validationFn(values));
    });
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
