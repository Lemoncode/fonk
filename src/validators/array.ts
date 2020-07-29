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

export const validator: FieldValidationFunctionAsync = validatorArgs => {
  const { value, customArgs } = validatorArgs;
  const formValidation = createFormValidation(customArgs);

  return reduceAsync(
    value,
    (validationResult, item) =>
      formValidation.validateForm(item).then(
        ({ fieldErrors, succeeded }) =>
          ({
            succeeded: validationResult.succeeded && succeeded,
            arrayErrors: [...validationResult.arrayErrors, fieldErrors],
          } as ArrayValidationResult)
      ),
    createEmptyArrayValidationResult()
  ).then(arrayValidationResult => ({
    succeeded: arrayValidationResult.succeeded,
    type: 'ARRAY_VALIDATIONS',
    message: null,
    arrayErrors: arrayValidationResult.arrayErrors,
  }));
};
