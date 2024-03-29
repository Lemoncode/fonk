import {
  InternalFieldValidationSchema,
  InternalRecordValidationSchema,
} from '../model';
import set from './set';

// TODO: Better naming for this?
export const safeArrayLength = <T>(collection: T[]) =>
  Array.isArray(collection) ? collection.length : 0;

export const arrayContainsEntries = <T>(collection: T[]) =>
  safeArrayLength(collection) > 0;

// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
export const isFunction = (v: any): v is Function => typeof v === 'function';

export const isLastIndexInArray = <T>(index: number, array: T[]) =>
  index === safeArrayLength(array) - 1;

export const isUndefinedOrNull = (v: any) => v === void 0 || v === null;

export const areAllElementsInArrayDefined = <T>(collection: T[]) =>
  arrayContainsEntries(collection) && collection.every((element) => element);

export const isPromise = <T>(value: any): value is Promise<T> =>
  value instanceof Promise;

export const safeObjectKeys = (value): string[] =>
  Boolean(value) ? Object.keys(value) : [];

export const reduceAsync = <Entity, Result>(
  collection: Entity[],
  callback: (acc: Result, entity: Entity, index?: number) => Promise<Result>,
  defaultResult: Result | Promise<Result>
): Promise<any> =>
  Array.isArray(collection)
    ? collection.reduce<Promise<Result>>((promise, item, index) => {
        return promise.then((result) => callback(result, item, index));
      }, Promise.resolve(defaultResult))
    : Promise.resolve(defaultResult);

export const isFieldIdInSchema = (
  fieldId: string,
  schema: InternalFieldValidationSchema | InternalRecordValidationSchema
): boolean => !isUndefinedOrNull(schema) && !isUndefinedOrNull(schema[fieldId]);

export const hasFieldIdArrayValidator = (
  fieldId: string,
  schema: InternalFieldValidationSchema
): boolean => /\[.*\]/.test(fieldId) && !isFieldIdInSchema(fieldId, schema);

export const formatFieldForArrayField = (fieldId: string, value) => {
  const formattedValue = set({}, fieldId, value);
  const keys = Boolean(fieldId) ? Object.keys(formattedValue) : [''];
  const id = Array.isArray(keys) && keys.length > 0 ? keys[0] : '';
  return {
    id,
    value: Array.isArray(formattedValue[id])
      ? [...formattedValue[id]]
      : formattedValue[id],
  };
};
