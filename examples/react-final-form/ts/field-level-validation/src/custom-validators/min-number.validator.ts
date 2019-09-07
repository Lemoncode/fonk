import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

export const minNumberValidator: FieldValidationFunctionSync = ({
  value,
  customArgs,
}) => {
  const succeeded = isNaN(value) || value >= customArgs.min;
  return {
    succeeded,
    message: succeeded ? '' : `Should be greater than ${customArgs.min}`,
    type: 'MIN_NUMBER',
  };
};
