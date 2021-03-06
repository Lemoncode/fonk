import {
  InternalValidationResult,
  ValidationResult,
  InternalFormValidationResult,
  FormValidationResult,
} from '../model';

const renameFieldNameKeys = (
  internalValidationResult: InternalValidationResult,
  fieldKey: string,
  fieldErrors: { [field: string]: ValidationResult },
  index: number
) => {
  const fieldNames = Object.keys(fieldErrors);
  return fieldNames.reduce(
    (result, fieldName) => ({
      ...result,
      [`${fieldKey}[${index}].${fieldName}`]: fieldErrors[fieldName],
    }),
    {}
  );
};

const mapArrayErrorListToValidationResult = (
  internalValidationResult: InternalValidationResult,
  fieldKey: string
): { [fieldId: string]: ValidationResult } =>
  internalValidationResult.arrayErrors.reduce(
    (validationResult, fieldErrors, index) => ({
      ...validationResult,
      ...renameFieldNameKeys(
        internalValidationResult,
        fieldKey,
        fieldErrors,
        index
      ),
    }),
    {}
  );

export const mapInternalValidationResultToValidationResult = (
  internalValidationResult: InternalValidationResult
): ValidationResult | { [fieldId: string]: ValidationResult } =>
  Boolean(internalValidationResult.arrayErrors)
    ? mapArrayErrorListToValidationResult(
        internalValidationResult,
        internalValidationResult.key
      )
    : {
        type: internalValidationResult.type,
        message: internalValidationResult.message,
        succeeded: internalValidationResult.succeeded,
      };

const mapInternalFieldErrorsToFieldErrors = (internalFieldErrors: {
  [fieldId: string]: InternalValidationResult;
}): { [fieldId: string]: ValidationResult } =>
  Object.keys(internalFieldErrors).reduce((fieldErrors, field) => {
    const validationResult = internalFieldErrors[field];
    const fieldValidationResult = Boolean(validationResult.arrayErrors)
      ? mapArrayErrorListToValidationResult(validationResult, field)
      : { [field]: validationResult };
    return {
      ...fieldErrors,
      ...fieldValidationResult,
    };
  }, {});

export const mapInternalFormValidationResultToFormValidationResult = (
  internalFormValidationResult: InternalFormValidationResult
): FormValidationResult => {
  return {
    succeeded: internalFormValidationResult.succeeded,
    recordErrors: internalFormValidationResult.recordErrors,
    fieldErrors: mapInternalFieldErrorsToFieldErrors(
      internalFormValidationResult.fieldErrors
    ),
  };
};
