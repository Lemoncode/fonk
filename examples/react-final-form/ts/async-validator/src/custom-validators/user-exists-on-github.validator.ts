import { FieldValidationFunctionAsync } from "@lemoncode/fonk";

export const userExistsOnGithubValidator: FieldValidationFunctionAsync = ({
  value
}) => {
  const validationResult = {
    type: "GITHUB_USER_EXISTS",
    succeeded: false,
    message: "The username exists on Github"
  };

  return fetch(`https://api.github.com/users/${value}`).then(response => {
    // Status 404, User does not exists, so the given user is valid
    // Status 200, meaning user exists, so the given user is not valid
    return response.status === 404
      ? {
          ...validationResult,
          succeeded: true,
          message: ""
        }
      : validationResult;
  });
};
