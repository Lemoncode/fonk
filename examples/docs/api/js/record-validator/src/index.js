import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults, checkoutForm } from './playground';

getResults().then(validationResult => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Record validator example</h2>

<pre><code class="language-js">
import { createFormValidation } from '@lemoncode/fonk';

const freeShippingAllowed = values => ({
  message: 'Total must be greater than 30USD to get cost free shippings',
  type: 'RECORD_FREE_SHIPPING',
  succeeded: values.subtotal - values.discount >= 30,
});

const validationSchema = {
  record: {
    freeShippingValidation: [freeShippingAllowed],
  },
};

const formValidation = createFormValidation(validationSchema);

// Update values in ./playground.js
const checkoutForm = ${JSON.stringify({ ...checkoutForm }, null, 2)};

// Execute form validation
formValidation
  .validateRecord(checkoutForm)
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
