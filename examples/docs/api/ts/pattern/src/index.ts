import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults, formValues } from './playground';

getResults().then(validationResult => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Pattern example</h2>

<pre><code class="language-js">
import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    phone1: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: '^(7|8|9)\\d{9}$' },
      },
    ],
    phone2: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: /^(7|8|9)\d{9}$/ },
      },
    ],
    phone3: [
      {
        validator: Validators.pattern.validator,
        customArgs: { pattern: new RegExp(/^(7|8|9)\d{9}$/) },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const formValues = ${JSON.stringify({ ...formValues }, null, 2)};

// Execute form validation
formValidation
  .validateForm(formValues)
  .then(validationResult => {
    console.log(validationResult);
  });
</code></pre>

<h3>Result: </h3>
<pre><code class="language-js">
${JSON.stringify(validationResult, null, 2)}
</code></pre>
</div>
    `;
});
