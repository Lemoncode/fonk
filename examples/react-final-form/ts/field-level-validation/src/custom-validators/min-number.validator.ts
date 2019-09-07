import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

interface CustomArgs {
  min: number;
}

export const minNumberValidator: FieldValidationFunctionSync<CustomArgs> = ({
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
