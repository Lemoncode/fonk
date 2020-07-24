import {
  InternalValidationResult,
  ValidationResult,
  InternalFormValidationResult,
  FormValidationResult,
} from '../model';

const mapArrayErrorToValidationResult = (
  internalValidationResult: InternalValidationResult
): { [fieldId: string]: ValidationResult } =>
  internalValidationResult.arrayErrors.reduce(
    (validationResult, fieldErrors, index) => {
      const fieldNames = Object.keys(fieldErrors);
      const fieldValidationResult = fieldNames.reduce(
        (result, key) => ({
          ...result,
          [`${internalValidationResult.key}[${index}].${key}`]: fieldErrors[
            key
          ],
        }),
        {}
      );
      return {
        ...validationResult,
        ...fieldValidationResult,
      };
    },
    {}
  );

export const mapInternalValidationResultToValidationResult = (
  internalValidationResult: InternalValidationResult
): ValidationResult | { [fieldId: string]: ValidationResult } =>
  Boolean(internalValidationResult.arrayErrors)
    ? mapArrayErrorToValidationResult(internalValidationResult)
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
    return {
      ...fieldErrors,
      [field]: Boolean(validationResult.arrayErrors)
        ? validationResult.arrayErrors
        : validationResult,
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
