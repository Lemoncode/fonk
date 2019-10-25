// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formValidation } from './form-validation';

const App = () => (
  <div>
    <h1>Customize validator error message locally</h1>
    <span>
      Update the error message text for a given validator just for an specific
      Field in a given validation form schema.
    </span>
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
