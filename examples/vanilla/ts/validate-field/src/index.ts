import { Validators, createFormValidation } from '@lemoncode/fonk';

const validationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [Validators.required.validator],
  },
};

const formValidation = createFormValidation(validationSchema);

const loginRecord = {
  user: '',
  password: '',
};

formValidation
  .validateField('user', loginRecord.user)
  .then(validationResult => {
    console.log(validationResult);

    document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Validate field example</h2>

<pre>
import { Validators, createFormValidation } from "@lemoncode/fonk";

const validationSchema = {
  field: {
    user: [Validators.required.validator],
    password: [Validators.required.validator]
  }
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
${JSON.stringify(validationResult, null, 2)}
</pre>
    </div>
    `;
  });
