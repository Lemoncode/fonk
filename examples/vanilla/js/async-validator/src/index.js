import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { getResults } from './playground';
setTimeout(() => Prism.highlightAll(), 100);

getResults().then(validationResult => {
  document.getElementById('app').innerHTML = `
    <div style="flex-grow: 1;margin-left:2rem;">
      <h2>Async validator example</h2>

<pre><code class="language-js">
import { Validators, createFormValidation } from '@lemoncode/fonk';

const userExistsOnGithubValidator = ({ value }) => {
  const validationResult = {
    type: 'GITHUB_USER_EXISTS',
    succeeded: false,
    message: 'The username exists on Github',
  };

  return fetch(\`https://api.github.com/users/\${value}\`).then(response => {
    // Status 404, User does not exists, so the given user is valid
    // Status 200, meaning user exists, so the given user is not valid
    return response.status === 404
      ? {
          ...validationResult,
          succeeded: true,
          message: '',
        }
      : validationResult;
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
