// Helper styles for demo
import './helper.css';

// Render Prop
import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Checkbox } from './checkbox';
import { formValidation } from './form-validation';

const App = () => (
  <div>
    <h1>Creating Record Validations</h1>
    <Formik
      initialValues={{ product: '', discount: 0, price: 0, isPrime: false }}
      validate={values => formValidation.validateForm(values)}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Field name="product" />
          <Field name="discount" />
          <Field name="price" />
          <Field
            component={Checkbox}
            id="isPrime"
            name="isPrime"
            label="Prime"
          />
          {errors && errors.recordErrors && (
            <div className="input-feedback">
              {errors.recordErrors.freeShipping}
            </div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
