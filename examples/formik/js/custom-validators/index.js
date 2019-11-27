// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './form-validation';

const App = () => (
  <div>
    <h1>Creating custom validators</h1>
    <span>
      How to Create a custom validator (number must be greater than 18), this
      validator is applied on the Age field (this validator is already available
      fonk-min-number-validator)
    </span>
    <Formik
      initialValues={{ firstName: '', lastName: '', age: '' }}
      validate={formValidation.validateForm}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="firstName" placeholder="Firstname" />
          <ErrorMessage name="firstName" component="div" />
          <Field name="lastName" placeholder="Lastname" />
          <ErrorMessage name="lastName" component="div" />
          <Field name="age" placeholder="Age" />
          <ErrorMessage name="age" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
