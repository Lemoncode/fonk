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
    <span>
      Display record validation error message if user has not prime services
      contracted or total is lower than 20USD, message to display: 'Subscribe to
      prime service or total must be greater than 20USD'
    </span>
    <span>Code: Check form-validate.js</span>

    <Formik
      initialValues={{ product: '', discount: '', price: '', isPrime: false }}
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
          <Field name="product" placeholder="Product name" />
          <Field name="discount" placeholder="Discounted amount" />
          <Field name="price" placeholder="Price" />
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
