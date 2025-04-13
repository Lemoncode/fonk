import type { ValidatorFn, ValidatorProps } from '../fonk.model.js';
import { isValidPattern } from '../fonk.helpers.js';

const DEFAULT_PROPS: ValidatorProps = {
  message: 'Invalid email',
};

// RegExp from http://emailregex.com
const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidField = (value: string): boolean => isValidPattern(value, EMAIL_PATTERN);

export const email: ValidatorFn =
  ({ message = DEFAULT_PROPS.message } = DEFAULT_PROPS) =>
  ({ value }) => {
    if (!isValidField(value)) {
      return message;
    }
  };
