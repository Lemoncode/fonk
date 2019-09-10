import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export const isNumberValidator: FieldValidationFunctionSync = ({ value }) => {
  const succeeded = !isNaN(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Must be a number',
    type: 'IS_NUMBER',
  };
};
