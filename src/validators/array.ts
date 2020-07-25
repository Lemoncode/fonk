import {
  FieldValidationFunctionAsync,
  FieldValidationSchema,
  ValidationResult,
} from '../model';
import { createFormValidation } from '../form-validation';
import { reduceAsync } from '../helpers';

export interface ArrayArgs {
  field: FieldValidationSchema;
}

interface ArrayValidationResult {
  succeeded: boolean;
  arrayErrors: {
    [fieldId: string]: ValidationResult;
  }[];
}

const createEmptyArrayValidationResult = (): ArrayValidationResult => ({
  succeeded: true,
  arrayErrors: [],
});

export const validator: FieldValidationFunctionAsync = async validatorArgs => {
  const { value, customArgs } = validatorArgs;
  const formValidation = createFormValidation(customArgs);

  const arrayValidationResult: ArrayValidationResult = await reduceAsync(
    value,
    async (validationResult, item) => {
      const { fieldErrors, succeeded } = await formValidation.validateForm(
        item
      );

      return {
        succeeded: validationResult.succeeded && succeeded,
        arrayErrors: [...validationResult.arrayErrors, fieldErrors],
      } as ArrayValidationResult;
    },
    createEmptyArrayValidationResult()
  );

  return {
    succeeded: arrayValidationResult.succeeded,
    type: 'ARRAY_VALIDATIONS',
    message: null,
    arrayErrors: arrayValidationResult.arrayErrors,
  };
};
