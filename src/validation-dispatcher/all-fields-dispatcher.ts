import get from 'lodash.get';
import { ValidationResult } from '../model';

// TODO: Pending adding unit tests
// TODO: Defensive programming? Check if fieldToValidate,
// values, validationFn are define
export const fireAllFieldsValidations = (
  values: any,
  fieldsToValidate: string[],
  validationFn: (
    values: any,
    key: string,
    value: any
  ) => Promise<ValidationResult>
): Promise<ValidationResult>[] =>
  fieldsToValidate.map(field =>
    validationFn(values, field, get(values, field, undefined))
  );
