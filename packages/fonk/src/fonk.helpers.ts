import type { ArrayIndexes, Errors } from './fonk.model.js';
import { ARRAY_FIELD_NUMBER_INDEX_REGEX, ARRAY_FIELD_STRING_INDEX_REGEX } from './fonk.constants.js';

export const getValueAtPath = <Model>(path: string[], values: Model) => {
  return path?.reduce((result, segment) => {
    if (result && typeof result === 'object') {
      return result[segment];
    }
    return undefined;
  }, values);
};

export const hasSomeError = <Model>(errors: Errors<Model>): boolean =>
  Object.values(errors).some(error => error !== undefined);

const isArrayFieldNumberIndex = (field: string): boolean => ARRAY_FIELD_NUMBER_INDEX_REGEX.test(field);

export const isArrayField = <Field extends string>(field: Field): boolean =>
  isArrayFieldNumberIndex(field) || ARRAY_FIELD_STRING_INDEX_REGEX.test(field);

export const normalizeField = <Field extends string>(field: Field): string =>
  isArrayField(field) ? field.replaceAll(new RegExp(ARRAY_FIELD_NUMBER_INDEX_REGEX, 'g'), '[i]') : field;

export const extractArrayIndexes = <Field extends string>(field: Field): ArrayIndexes<Field & string> | undefined => {
  let parentPath = '';
  return isArrayFieldNumberIndex(field)
    ? field.split('.').reduce(
        (arrayIndexes, segment) => {
          if (isArrayFieldNumberIndex(segment)) {
            const index = Number(segment.match(ARRAY_FIELD_NUMBER_INDEX_REGEX)?.[1]);
            const key = segment.replace(ARRAY_FIELD_NUMBER_INDEX_REGEX, '');
            arrayIndexes[`${parentPath}${key}`] = index;
            parentPath = `${parentPath}${key}.`;
          } else {
            parentPath = `${parentPath}${segment}.`;
          }
          return arrayIndexes;
        },
        {} as ArrayIndexes<Field & string>
      )
    : undefined;
};

const isEmptyValue = (value: string) => value === null || value === undefined || value === '';

export const isValidPattern = (value: string, pattern: RegExp): boolean =>
  isEmptyValue(value) ? true : pattern.test(value);

const getParamsToParse = (message: string): string[] => message.match(/{{[^{}][\w\.]*}}/g);

const getParamPath = (param: string): string[] => param.replace(/[{}]/g, '').split('.');

const parseMessage = <Params>(message: string, params: Params): string => {
  const parsableParams = getParamsToParse(message);
  return Array.isArray(parsableParams)
    ? parsableParams.reduce((customMessage, param) => {
        const path = getParamPath(param);
        const value = getValueAtPath(path, params);
        return value !== undefined ? customMessage.replace(param, value) : customMessage;
      }, message)
    : message;
};

export const replaceParamsInMessage = <Params>(message: string, params: Params): string => {
  return message ? parseMessage(message, params) : '';
};
