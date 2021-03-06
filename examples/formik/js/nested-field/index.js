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
    <h1>Validating nested field (e.g. "client.product.name")</h1>
    <span>
      A record can contain complex structures, we can use here the dot notation
      (e.g. "client.product.name")
    </span>
    <Formik
      initialValues={{ product: { name: '' } }}
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
            type="text"
            name="product.name"
            validate={value =>
              formValidation.validateField('product.name', value, values)
            }
          />
          <ErrorMessage name="product.name" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
