import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults, loginModel } from './playground';

getResults().then(validationResult => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Field validator example</h2>

<pre><code class="language-js">
import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    user: [Validators.required.validator, Validators.email.validator],
    password: [
      Validators.required.validator,
      {
        validator: Validators.minLength.validator,
        customArgs: { length: 3 },
      },
    ],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.ts
const loginModel = ${JSON.stringify({ ...loginModel }, null, 2)};

// Execute form validation
formValidation
  .validateForm(loginModel)
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
