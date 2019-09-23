import get from 'lodash.get';

const getArgsToParse = (message: string) => message.match(/{{[^{}][\w\.]*}}/g);

const getArgPath = (arg: string) => arg.replace(/[{}]/g, '');

const parseMessage = (message: string, customArgs: any) => {
  const parsableArgs = getArgsToParse(message);
  return Array.isArray(parsableArgs)
    ? parsableArgs.reduce(
        (customMessage, arg) =>
          customMessage.replace(arg, get(customArgs, getArgPath(arg), arg)),
        message
      )
    : message;
};

export const parseMessageWithCustomArgs = (
  message: string,
  customArgs: any
) => {
  return message ? parseMessage(message, customArgs) : '';
};
