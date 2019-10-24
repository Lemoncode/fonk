// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './validate';

const App = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ firstname: '', lastName: '', age: '' }}
      validate={values => formValidation.validateForm(values)}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="firstname" placeholder="Firstname" />
          <ErrorMessage name="firstname" component="div" />
          <Field name="lastname" placeholder="Lastname" />
          <ErrorMessage name="lastname" component="div" />
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
