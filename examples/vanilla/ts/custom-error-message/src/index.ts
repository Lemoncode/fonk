import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { getResults, formValues } from './playground';

getResults().then(validationResult => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Custom error message example</h2>

<pre><code class="language-js">
import {
  Validators,
  createFormValidation,
  ValidationSchema,
} from '@lemoncode/fonk';

const validationSchema: ValidationSchema = {
  field: {
    product: [
      {
        validator: Validators.required.validator,
        message: 'My custom error message',
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const formValues = ${JSON.stringify({ ...formValues }, null, 2)};

// Execute form validation
formValidation
  .validateField('product', formValues.product)
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
