import { FieldValidation } from '../model';

export interface ValidationParams {
  values: any;
  value: any;
  fieldValidationCollection: FieldValidation[];
}

export const createValidationParams = (
  values: any,
  value: any,
  fieldValidationCollection: FieldValidation[]
): ValidationParams => ({
  values,
  value,
  fieldValidationCollection,
});

export enum ValidationCheck {
  ERROR_NOT_EXPECTED,
  FAILED,
  SUCCEEDED,
}
