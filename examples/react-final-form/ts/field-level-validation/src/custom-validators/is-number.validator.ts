import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

export const isNumberValidator: FieldValidationFunctionSync = ({ value }) => {
  const succeeded = !isNaN(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Must be a number',
    type: 'IS_NUMBER',
  };
};
