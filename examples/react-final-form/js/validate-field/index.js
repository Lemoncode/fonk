import React from 'react';
import { render } from 'react-dom';
import Styles from './styles';
import { Form, Field } from 'react-final-form';
import { formValidation } from './form-validation';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const App = () => (
  <Styles>
    <h1>Form Validation with Fonk and React Final Form Example</h1>
    <h2>Synchronous Field-Level Validation</h2>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="firstName"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
          >
            {({ input, meta }) => (
              <div>
                <label>First Name</label>
                <input {...input} type="text" placeholder="First Name" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="lastName"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
          >
            {({ input, meta }) => (
              <div>
                <label>Last Name</label>
                <input {...input} type="text" placeholder="Last Name" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="age"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
          >
            {({ input, meta }) => (
              <div>
                <label>Age</label>
                <input {...input} type="text" placeholder="Age" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  </Styles>
);

render(<App />, document.getElementById('root'));
