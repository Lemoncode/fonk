import './helper.css';

import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { formValidation } from './form-validation';

const createEmptyUser = () => ({
  name: '',
  email: '',
  repeatEmail: '',
});

const App = () => (
  <div>
    <h1>Validating a user list when it creates multiple users</h1>
    <span>Add new user and check validations:</span>
    <Formik
      initialValues={{ users: [createEmptyUser()] }}
      validate={formValidation.validateForm}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors }) => (
        <Form>
          <FieldArray
            name="users"
            render={arrayHelpers => (
              <div>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(createEmptyUser())}
                >
                  Add User
                </button>
                {values.users.map((_, index) => (
                  <div className="row">
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                    <div className="input">
                      <Field
                        type="text"
                        name={`users[${index}].name`}
                        placeholder="Name"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`users[${index}].name`}
                        component="div"
                      />
                    </div>
                    <div className="input">
                      <Field
                        type="text"
                        name={`users[${index}].email`}
                        placeholder="Email"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`users[${index}].email`}
                        component="div"
                      />
                    </div>
                    <div className="input">
                      <Field
                        type="text"
                        name={`users[${index}].repeatEmail`}
                        placeholder="Repeat email"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`users[${index}].repeatEmail`}
                        component="div"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          />

          <button type="submit">Submit</button>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
