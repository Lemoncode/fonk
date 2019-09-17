import { Validators, createFormValidation } from '@lemoncode/fonk';

const userExistsOnGithubValidator = ({ value }) => {
  const validationResult = {
    type: 'GITHUB_USER_EXISTS',
    succeeded: false,
    message: '',
  };

  return fetch(`https://api.github.com/users/${value}`)
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

export const getResults = () => {
  const formValues = {
    user: 'mojombo',
    password: '',
  };

  return formValidation.validateField('user', formValues.user);
};
