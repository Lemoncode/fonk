import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {
  getResults,
  failedValues,
  succeededValues,
} from './playground';

getResults().then(([failedResult, succeededResult]) => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Example with failed result:</h2>

<pre><code class="language-js">
import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    ibanAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^ES\d*$/ },
        message: 'Invalid IBAN number',
      },
    ],
    bicAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^BIC\d*$/ },
        message: 'Invalid BIC number',
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const failedValues = ${JSON.stringify({ ...failedValues }, null, 2)};

// Execute form validation
formValidation.validateForm(failedValues)
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
import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    ibanAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^ES\d*$/ },
        message: 'Invalid IBAN number',
      },
    ],
    bicAccount: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^BIC\d*$/ },
        message: 'Invalid BIC number',
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const succeededValues = ${JSON.stringify(
    { ...succeededValues },
    null,
    2
  )};

// Execute form validation
formValidation.validateForm(succeededValues)
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
