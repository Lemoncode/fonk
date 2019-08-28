import { ValidationResult, RecordValidationSchema } from '../model';

export const areAllRecordValidationsDefined = (
  validationSchemaCollection: RecordValidationSchema[]
): boolean =>
  validationSchemaCollection.every(
    validationSchema => validationSchema && validationSchema.validation
  );

export const fireRecordValidations = (
  values: any,
  validations: RecordValidationSchema[]
): Promise<ValidationResult>[] => {
  let validationResultsPromises: Promise<ValidationResult>[] = [];

  if (areAllRecordValidationsDefined(validations)) {
    validationResultsPromises = validations.map(validation =>
      validation.validation(values, validation.message)
    );
  } else {
    console.error('One of the form record validations are not defined.');
  }
  return validationResultsPromises;
};
