import React from 'react';
import { render } from 'react-dom';
import Styles from './styles';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { formValidation } from './form-validation';

const onSubmit = values => {
  console.log({ values });
};

const createEmptyUser = () => ({
  name: '',
  email: '',
  repeatEmail: '',
});

const App = () => (
  <Styles>
    <h1>Validating a user list when it creates multiple users</h1>
    <span>Add new user and check validations:</span>
    <Form
      onSubmit={onSubmit}
      initialValues={{ users: [] }}
      validate={formValidation.validateForm}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="users"
            render={({ fields }) => (
              <React.Fragment>
                <button
                  type="button"
                  onClick={() => fields.push(createEmptyUser())}
                >
                  Add user
                </button>
                {values.users.map((_, index) => (
                  <div className="row">
                    <button type="button" onClick={() => fields.remove(index)}>
                      -
                    </button>
                    <Field name={`users[${index}].name`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input {...input} type="text" placeholder="Name" />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name={`users[${index}].email`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input
                            {...input}
                            type="text"
                            placeholder="Email"
                          />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name={`users[${index}].repeatEmail`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input {...input} type="text" placeholder="Repeat email" />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                ))}
              </React.Fragment>
            )}
          />

          <button type="submit">Submit</button>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </form>
      )}
    />
  </Styles>
);

render(<App />, document.getElementById('root'));
