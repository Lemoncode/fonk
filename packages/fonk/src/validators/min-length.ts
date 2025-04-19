import type { ValidatorFn, ValidatorProps } from '../fonk.model.js';
import { replaceParamsInMessage } from '../fonk.helpers.js';

export interface MinLengthParams {
  length: number;
  message?: string;
}

const DEFAULT_PROPS: ValidatorProps<MinLengthParams> = {
  length: undefined,
  message: 'The value provided does not fulfill min length.',
};

export const minLength: ValidatorFn<MinLengthParams> =
  ({ length = DEFAULT_PROPS.length, message = DEFAULT_PROPS.message } = DEFAULT_PROPS) =>
  ({ value }) => {
    if (length === undefined) {
      throw new Error('Parameter "length" for minLength is mandatory.');
    }

    if (typeof value === 'string' && value.length < length) {
      return replaceParamsInMessage(message, { length });
    }
  };
