import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults } from './playground';

getResults().then(([failedResult, succeededResult]) => {
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

const formValues = {
  product: 'shoes',
  discount: 5,
  price: 20,
  isPrime: false,
  freeShipping: true,
};

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

const formValues = {
  product: 'shoes',
  discount: 5,
  price: 20,
  isPrime: true,
  freeShipping: true,
};

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
