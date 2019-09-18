import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import {
  getResults,
  failedLoginRecord,
  succeededLoginRecord,
} from './playground';

getResults().then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Example with failed result:</h2>

<pre><code class="language-js">
import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [Validators.required.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const failedLoginRecord = ${JSON.stringify({ ...failedLoginRecord }, null, 2)};

// Execute form validation
formValidation
  .validateForm(loginRecord)
  .then(formValidationResult => {
    console.log(formValidationResult);
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
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [Validators.required.validator],
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
  .validateForm(loginRecord)
  .then(formValidationResult => {
    console.log(formValidationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(succeededResult, null, 2)}
</code></pre>
</div>
    `;
});
