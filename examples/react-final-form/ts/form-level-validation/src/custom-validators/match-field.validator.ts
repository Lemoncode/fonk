import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

export const matchFieldValidator: FieldValidationFunctionSync = ({
  value,
  values,
  customArgs,
}) => {
  const succeeded = value === values[customArgs.fieldId];
  return {
    succeeded,
    message: succeeded ? '' : 'Must match',
    type: 'MATCH_FIELD',
  };
};
