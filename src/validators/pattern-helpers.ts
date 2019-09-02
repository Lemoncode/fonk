const isEmptyValue = value =>
  value === null || value === undefined || value === '';

export const isValidPattern = (value, pattern: RegExp): boolean =>
  isEmptyValue(value) ? true : pattern.test(value);
