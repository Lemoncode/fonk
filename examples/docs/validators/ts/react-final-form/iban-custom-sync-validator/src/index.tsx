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
    <h2>IBAN custom sync validator</h2>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="account"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
          >
            {({ input, meta }) => (
              <div>
                <label>Account</label>
                <input {...input} type="text" placeholder="Account" />
                {meta.error && meta.touched && (
                  <span>{meta.error}</span>
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
