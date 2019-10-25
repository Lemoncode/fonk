// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './validate';

const App = () => (
  <div>
    <h1>Triggering validations at field level</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
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
            type="email"
            name="email"
            validate={value =>
              formValidation.validateField('email', value, values)
            }
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            validate={value =>
              formValidation.validateField('password', value, values)
            }
          />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
