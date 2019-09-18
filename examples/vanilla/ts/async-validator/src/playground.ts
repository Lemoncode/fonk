import {
  Validators,
  createFormValidation,
  ValidationSchema,
  FieldValidationFunctionAsync,
} from '@lemoncode/fonk';

const userExistsOnGithubValidator: FieldValidationFunctionAsync = ({
  value,
}) => {
  const validationResult = {
    type: 'GITHUB_USER_EXISTS',
    succeeded: false,
    message: 'The username exists on Github',
  };

  return fetch(`https://api.github.com/users/${value}`).then(response => {
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

const validationSchema: ValidationSchema = {
  field: {
    user: [Validators.required.validator, userExistsOnGithubValidator],
  },
};

const formValidation = createFormValidation(validationSchema);

export const formValues = {
  user: 'mojombo',
  password: '',
};

export const getResults = () => {
  return formValidation.validateField('user', formValues.user);
};
