import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export const isNumberValidator: FieldValidationFunctionSync = ({ value }) => {
  const succeeded = !isNaN(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Must be a number',
    type: 'IS_NUMBER',
  };
};

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
