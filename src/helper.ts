export const arrayContainsEntries = <T>(collection: T[]) =>
  Array.isArray(collection) && collection.length > 0;

// TODO: add unit tests
// TODO: Better naming for this?
// Cover undefined and null cases, returns 0 in that case
export const safeArrayLength = <T>(collection: T[]) =>
  collection ? collection.length : 0;

export const arrayContainsElements = <T>(collection: T[]) =>
  safeArrayLength(collection) > 0;

// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
export const isFunction = (v: any): v is Function => typeof v === 'function';

export const isLastIndexInArray = <T>(index: number, array: T[]) =>
  index === safeArrayLength(array) - 1;

export const isUndefinedOrNull = (v: any) => v === void 0 || v === null;
