// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './form-validation';

// Watch out !! Issue Here ErrorMessage expects
// field name, not valid to pass _password.message_
// and error field if not plain text bad crash
const App = () => (
  <div>
    <h1>Using formik components: Formik, Field, ErrorMessage</h1>
    <span>
      Example using Formik's Field and Error components. Validates that a given
      field is required and must be an email, the second field is required
    </span>
    <Formik
      initialValues={{ email: '', password: '' }}
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
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" placeholder="Password" />
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
