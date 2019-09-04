export const mustBeNumberValidator = ({ value }) => {
  const succeeded = !isNaN(value);
  return {
    succeeded,
    message: succeeded ? '' : 'Must be a number',
    type: 'MUST_BE_NUMBER',
  };
};
