import { ValidationResult, RecordValidationFunction } from '../model';
import { areAllElementsInArrayDefined } from '../helper';

export const fireRecordValidations = (
  values: any,
  validations: RecordValidationFunction[]
): Promise<ValidationResult>[] => {
  let validationResultsPromises: Promise<ValidationResult>[] = [];

  if (areAllElementsInArrayDefined(validations)) {
    validationResultsPromises = validations.map(validationFn =>
      validationFn(values)
    );
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
