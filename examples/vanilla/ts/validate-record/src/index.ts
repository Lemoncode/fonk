import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {
  getResults,
  failedFormValues,
  succeededFormValues,
} from './playground';

getResults().then(([failedResult, succeededResult]) => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Example with failed result:</h2>

<pre><code class="language-js">
import {
  createFormValidation,
  RecordValidationFunctionSync,
  ValidationSchema,
} from '@lemoncode/fonk';

const freeShippingRecordValidator: RecordValidationFunctionSync = ({
  values,
}) => {
  const succeeded = values.isPrime || values.price - values.discount > 20;

  return {
    succeeded,
    message: succeeded
      ? ''
      : 'Subscribe to prime service or total must be greater than 20USD',
    type: 'RECORD_FREE_SHIPPING',
  };
};

const validationSchema: ValidationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const failedFormValues = ${JSON.stringify({ ...failedFormValues }, null, 2)};

// Execute form validation
formValidation
  .validateRecord(formValues)
  .then(recordValidationResult => {
    console.log(recordValidationResult);
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
import {
  createFormValidation,
  RecordValidationFunctionSync,
  ValidationSchema,
} from '@lemoncode/fonk';

const freeShippingRecordValidator: RecordValidationFunctionSync = ({
  values,
}) => {
  const succeeded = values.isPrime || values.price - values.discount > 20;

  return {
    succeeded,
    message: succeeded
      ? ''
      : 'Subscribe to prime service or total must be greater than 20USD',
    type: 'RECORD_FREE_SHIPPING',
  };
};

const validationSchema: ValidationSchema = {
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const succeededFormValues = ${JSON.stringify(
    { ...succeededFormValues },
    null,
    2
  )};

// Execute form validation
formValidation
  .validateRecord(formValues)
  .then(recordValidationResult => {
    console.log(recordValidationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(succeededResult, null, 2)}
</code></pre>
</div>
    `;
});
