import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { getResults, formValues } from './playground';

getResults().then(validationResult => {
  setTimeout(() => Prism.highlightAll(), 0);
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Max length example</h2>

<pre><code class="language-js">
import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    description: [
      {
        validator: Validators.maxLength.validator,
        customArgs: { length: 20 }, // Valid description for length lower than 20 chars
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
