import React from 'react';
import { render } from 'react-dom';
import Styles from './styles';
import { Form, Field } from 'react-final-form';
import { formValidation } from './form-validation';

const onSubmit = values => {
  console.log({ values });
};

const App = () => (
  <Styles>
    <h1>Custom error message with Fonk and React Final Form Example</h1>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="product"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
          >
            {({ input, meta }) => (
              <div>
                <label>Product</label>
                <input {...input} type="text" placeholder="Product" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
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
