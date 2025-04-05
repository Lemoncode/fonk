import type { ValidatorFn, ValidatorProps } from '../model.js';
import { parseMessageWithCustomArgs } from '../validators.helpers.js';

export interface RequiredParams {
  trim?: boolean;
}
const DEFAULT_PROPS: ValidatorProps<RequiredParams> = {
  trim: true,
  message: 'Required',
};

const isStringValid = (value: string, trim: boolean): boolean => (trim ? value.trim().length > 0 : value.length > 0);
const isNonStringValid = (value: any): boolean => value !== void 0 && value !== null;
const isValidField = (value: any, trim: boolean): boolean =>
  typeof value === 'string' ? isStringValid(value, trim) : isNonStringValid(value);

export const required: ValidatorFn<RequiredParams> =
  ({ trim = DEFAULT_PROPS.trim, message = DEFAULT_PROPS.message } = DEFAULT_PROPS) =>
  ({ value }) => {
    const success = isValidField(value, Boolean(trim));

    if (!success) {
      return parseMessageWithCustomArgs(message, { trim });
    }
  };
