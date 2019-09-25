import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {
  getResults,
  failedLoginRecord,
  succeededLoginRecord,
} from './playground';

getResults().then(([failedResult, succeededResult]) => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Example with failed result:</h2>

<pre><code class="language-js">
// Validator
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
    throw \`\${validatorType}: error you should inform customArgs
     countryCode prefix (2 characters length)\`;
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

// Use it
import { createFormValidation, ValidationSchema } from '@lemoncode/fonk';
import { ibanValidator } from './custom-validator';

const validationSchema: ValidationSchema = {
  field: {
    account: [
      {
        validator: ibanValidator,
        customArgs: {
          countryCode: 'ES',
        },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const failedLoginRecord = ${JSON.stringify({ ...failedLoginRecord }, null, 2)};

// Execute form validation
formValidation
  .validateField("user", loginRecord.user)
  .then(validationResult => {
    console.log(validationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(failedResult, null, 2)}
</code></pre>
</div>

<div style="flex-grow: 1;margin-left:2rem;">
<h2>Example with succeeded result:</h2>

<pre><code class="language-js">
// Validator
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
    throw \`\${validatorType}: error you should inform customArgs
     countryCode prefix (2 characters length)\`;
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

// Use it
import { createFormValidation, ValidationSchema } from '@lemoncode/fonk';
import { ibanValidator } from './custom-validator';

const validationSchema: ValidationSchema = {
  field: {
    account: [
      {
        validator: ibanValidator,
        customArgs: {
          countryCode: 'ES',
        },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const succeededLoginRecord = ${JSON.stringify(
    { ...succeededLoginRecord },
    null,
    2
  )};

// Execute form validation
formValidation
  .validateField("user", loginRecord.user)
  .then(validationResult => {
    console.log(validationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(succeededResult, null, 2)}
</code></pre>
</div>
    `;
});
