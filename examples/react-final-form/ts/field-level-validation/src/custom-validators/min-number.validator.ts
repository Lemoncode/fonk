import { FieldValidationFunctionSync } from '@lemoncode/fonk';

interface MinNumberArgs {
  min: number;
}

export const minNumberValidator: FieldValidationFunctionSync<MinNumberArgs> = ({
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
