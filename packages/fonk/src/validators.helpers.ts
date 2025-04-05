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

const getArgsToParse = (message: string): string[] => message.match(/{{[^{}][\w\.]*}}/g);

const getArgPath = (arg: string): string => arg.replace(/[{}]/g, '');

const parseMessage = (message: string, customArgs: any): string => {
  const parsableArgs = getArgsToParse(message);
  return Array.isArray(parsableArgs)
    ? parsableArgs.reduce(
        (customMessage, arg) => customMessage.replace(arg, get(customArgs, getArgPath(arg), arg)),
        message
      )
    : message;
};

export const parseMessageWithCustomArgs = (message: string, customArgs: any): string => {
  return message ? parseMessage(message, customArgs) : '';
};
