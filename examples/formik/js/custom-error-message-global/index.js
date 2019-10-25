// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './form-validation';
import { Validators } from '@lemoncode/fonk';

Validators.required.setErrorMessage('My custom error message');

const App = () => (
  <div>
    <h1>
      Replacing a given validator error message with a custom one globally
    </h1>
    <Formik
      initialValues={{ product: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field
            name="product"
            validate={value =>
              formValidation.validateField('product', value, values)
            }
          />
          <ErrorMessage name="product" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
