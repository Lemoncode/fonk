// TODO: Refactor all methods

import { ARRAY_FIELD_REGEX } from './fonk.constants.js';
import type { Errors } from './fonk.model.js';

// TODO: Temporal solution. Refactor
export const getValueAtPath = <Model>(path: string[], values: Model) => {
  return path.reduce((result, segment) => {
    if (result && typeof result === 'object') {
      return result[segment];
    }
    return undefined;
  }, values);
};

export const hasSomeError = <Model, ValidationResult>(errors: Errors<Model, ValidationResult>): boolean =>
  Object.values(errors).some(error => error !== undefined);

export const isArrayField = <Field extends string>(field: Field): boolean =>
  ARRAY_FIELD_REGEX.test(field) || /\[i\]/.test(field);

const get = (obj: any, path: string, defaultValue: any): any => {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current[key] === undefined) {
      return defaultValue;
    }
    current = current[key];
  }
  return current;
};

const getParamsToParse = (message: string): string[] => message.match(/{{[^{}][\w\.]*}}/g);

const getParamPath = (param: string): string => param.replace(/[{}]/g, '');

const parseMessage = (message: string, params: any): string => {
  const parsableParams = getParamsToParse(message);
  return Array.isArray(parsableParams)
    ? parsableParams.reduce(
        (customMessage, param) => customMessage.replace(param, get(params, getParamPath(param), param)),
        message
      )
    : message;
};

export const replaceParamsInMessage = (message: string, params: any): string => {
  return message ? parseMessage(message, params) : '';
};

const isEmptyValue = (value: string) => value === null || value === undefined || value === '';

export const isValidPattern = (value: string, pattern: RegExp): boolean =>
  isEmptyValue(value) ? true : pattern.test(value);
