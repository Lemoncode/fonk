import React from 'react';
import { render } from 'react-dom';
import Styles from './styles';
import { formValidation } from './form-validation';
import { createEmptyUser, createEmptyUserError } from './model';

const App = () => {
  const [user, setUser] = React.useState(createEmptyUser());
  const [userError, setUserError] = React.useState(createEmptyUserError());

  const handleSubmit = e => {
    e.preventDefault();
    formValidation.validateForm(user).then(({ fieldErrors }) => {
      setUserError({ ...userError, ...fieldErrors });
    });
  };

  const handleValidateField = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.type;
    formValidation
      .validateField(name, value, null, type)
      .then(validationResult =>
        setUserError({ ...userError, [name]: validationResult })
      );
  };

  const handleUpdateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    handleValidateField(e);
  };

  return (
    <Styles>
      <h1>Form Validation with Fonk and React Example</h1>
      <h2>Validate on event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleUpdateField}
            onDoubleClick={handleValidateField}
          />
          <span>{userError.firstName.message}</span>
        </div>
        <div>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleUpdateField}
            onBlur={handleValidateField}
          />
          <span>{userError.lastName.message}</span>
        </div>
        <div>
          <input name="age" value={user.age} onChange={handleUpdateField} />
          <span>{userError.age.message}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Styles>
  );
};

render(<App />, document.getElementById('root'));
