import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults, formValues } from './playground';

getResults().then(([fieldResult, recordResult, formResult]) => {
  document.getElementById('app').innerHTML = `
  <div style="flex-grow: 1;margin-left:2rem;">
  <h2>Example using validate field, form and record:</h2>
<pre><code class="language-js">
import { createFormValidation, Validators } from '@lemoncode/fonk';

const freeShippingRecordValidator = ({ values }) => {
  const succeeded = values.isPrime || values.price - values.discount > 20;

  return {
    succeeded,
    message: succeeded
      ? ''
      : 'Subscribe to prime service or total must be greater than 20USD',
    type: 'RECORD_FREE_SHIPPING',
  };
};

const validationSchema = {
  field: {
    product: [Validators.required.validator],
    discount: [Validators.required.validator],
    price: [Validators.required.validator],
  },
  record: {
    freeShipping: [freeShippingRecordValidator],
  },
};

export const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const formValues = ${JSON.stringify({ ...formValues }, null, 2)};
</code></pre>
</div>

<div style="flex-grow: 1;margin-left:2rem;">

<h2>Validate field </h2>
<pre class="language-js" style="display: flex;">
<code class="language-js">
formValidation
.validateField('product', formValues.product)
.then(validationResult => {
  console.log(validationResult);
});
</code>

<code class="language-js" style="margin-left:4rem;">
// Result
${JSON.stringify(fieldResult, null, 2)}
</code>
</pre>

<h2>Validate record </h2>
<pre class="language-js" style="display: flex;">
<code class="language-js">
formValidation
.validateRecord(formValues)
.then(recordValidationResult => {
  console.log(recordValidationResult);
});
</code>

<code class="language-js" style="margin-left:4rem;">
// Result
${JSON.stringify(recordResult, null, 2)}
</code>
</pre>

<h2>Validate form </h2>
<pre class="language-js" style="display: flex;">
<code class="language-js">
formValidation
.validateForm(formValues)
.then(formValidationResult => {
  console.log(formValidationResult);
});
</code>

<code class="language-js" style="margin-left:4rem;">
// Result
${JSON.stringify(formResult, null, 2)}
</code>
</pre>
</div>
    `;
});
