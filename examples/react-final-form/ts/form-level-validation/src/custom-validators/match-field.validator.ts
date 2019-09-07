import { FieldValidationFunctionSync } from '@lemoncode/form-validation';

interface CustomArgs {
  fieldId: string;
}

export const matchFieldValidator: FieldValidationFunctionSync<CustomArgs> = ({
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
