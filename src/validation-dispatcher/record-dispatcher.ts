import { ValidationResult, FullRecordValidationAsync } from '../model';

export const areAllRecordValidationsDefined = (
  fullRecordValidationCollection: FullRecordValidationAsync[]
): boolean =>
  fullRecordValidationCollection.every(
    fullRecordValidation =>
      fullRecordValidation && fullRecordValidation.validation
  );

export const fireRecordValidations = (
  values: any,
  validations: FullRecordValidationAsync[]
): Promise<ValidationResult>[] => {
  let validationResultsPromises: Promise<ValidationResult>[] = [];

  if (areAllRecordValidationsDefined(validations)) {
    validationResultsPromises = validations.map(validation => {
      return validation.validation({
        value: values,
        message: validation.message,
      });
    });
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
