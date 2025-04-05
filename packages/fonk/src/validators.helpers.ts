// TODO: Refactor all methods

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
