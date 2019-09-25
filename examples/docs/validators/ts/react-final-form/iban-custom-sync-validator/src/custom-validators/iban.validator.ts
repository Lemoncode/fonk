import {
  parseMessageWithCustomArgs,
  FieldValidationFunctionSync,
} from '@lemoncode/fonk';

const validatorType = 'MY_IBAN_VALIDATOR';

let defaultMessage = 'IBAN does not belong to {{countryCode}}';
export const setErrorMessage = message => (defaultMessage = message);

const hasValidCountryCode = (value, customArgs) =>
  value &&
  value[0] === customArgs.countryCode[0] &&
  value[1] === customArgs.countryCode[1];

interface CustomArgs {
  countryCode: string;
}

export const ibanValidator: FieldValidationFunctionSync<
  CustomArgs
> = fieldValidatorArgs => {
  const { value, customArgs, message = defaultMessage } = fieldValidatorArgs;

  // Depending in your case you may feed default values to customArgs or throw
  // an exception or a console.log error
  if (!customArgs.countryCode || customArgs.countryCode.length !== 2) {
    throw `${validatorType}: error you should inform customArgs countryCode prefix (2 characters length)`;
  }
  const validationResult = {
    succeeded: false,
    type: validatorType,
    message: parseMessageWithCustomArgs(message as string, customArgs),
  };

  if (hasValidCountryCode(value, customArgs)) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }

  return validationResult;
};
