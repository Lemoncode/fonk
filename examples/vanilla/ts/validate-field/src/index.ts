import './styles.css';
import { getResults } from './playground';

getResults().then(([failedResult, succeededResult]) => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Example with failed result:</h2>

<pre>
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

const loginRecord = {
  user: '',
  password: '',
};

const formValidation = createFormValidation(validationSchema);

// Execute form validation
formValidation
  .validateField("user", loginRecord.user)
  .then(validationResult => {
    console.log(validationResult);
  });
</pre>

<h3>Result: </h3>
<pre>
${JSON.stringify(failedResult, null, 2)}
</pre>
</div>

<div style="flex-grow: 1;margin-left:2rem;">
<h2>Example with succeeded result:</h2>

<pre>
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

const loginRecord = {
  user: 'John',
  password: '',
};

const formValidation = createFormValidation(validationSchema);

// Execute form validation
formValidation
  .validateField("user", loginRecord.user)
  .then(validationResult => {
    console.log(validationResult);
  });
</pre>

<h3>Result: </h3>
<pre>
${JSON.stringify(succeededResult, null, 2)}
</pre>
</div>
    `;
});
