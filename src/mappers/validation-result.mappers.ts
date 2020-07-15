import { InternalValidationResult, ValidationResult } from '../model';

const mapArrayError = (
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
    ? mapArrayError(internalValidationResult)
    : {
        type: internalValidationResult.type,
        message: internalValidationResult.message,
        succeeded: internalValidationResult.succeeded,
      };
