import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
Prism.highlightAll();
import { getResults } from './playground';

getResults().then(validationResult => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Nested field example</h2>

<pre><code class="language-js">
import { Validators, createFormValidation } from '@lemoncode/fonk';

const userExistsOnGithubValidator = ({ value }) => {
  const validationResult = {
    type: 'GITHUB_USER_EXISTS',
    succeeded: false,
    message: '',
  };

  return fetch(\`https://api.github.com/users/\${value}\`)
    .then(() => {
      // Status 200, meaning user exists, so the given user is valid
      validationResult.succeeded = true;
      validationResult.message = '';
      return validationResult;
    })
    .catch(error => {
      if (error.status === 404) {
        // User does not exists, so the given user is not valid
        validationResult.succeeded = false;
        validationResult.message = 'The username does not exists Github';
        return validationResult;
      } else {
        // Unexpected error
        throw error;
      }
    });
};

const validationSchema = {
  field: {
    user: [Validators.required.validator, userExistsOnGithubValidator],
  },
};

const formValidation = createFormValidation(validationSchema);

const formValues = {
  user: 'mojombo',
  password: '',
};

// Execute form validation
formValidation
  .validateField('user', formValues.user)
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
