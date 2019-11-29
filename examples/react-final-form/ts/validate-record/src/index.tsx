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
    <h1>Validate record with Fonk and React Final Form Example</h1>
    <Form
      onSubmit={onSubmit}
      validate={formValidation.validateRecord}
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field name="product" type="text">
            {({ input }) => (
              <div>
                <label>Product</label>
                <input {...input} placeholder="Product" />
              </div>
            )}
          </Field>
          <Field name="discount" type="number">
            {({ input }) => (
              <div>
                <label>Discount</label>
                <input {...input} placeholder="Discount" />
              </div>
            )}
          </Field>
          <Field name="price" type="number">
            {({ input }) => (
              <div>
                <label>Price</label>
                <input {...input} placeholder="Price" />
              </div>
            )}
          </Field>
          <Field name="isPrime" type="checkbox">
            {({ input }) => (
              <div>
                <label>Prime</label>
                <input {...input} />
              </div>
            )}
          </Field>
          {errors && errors.recordErrors && (
            <span>{errors.recordErrors.freeShipping}</span>
          )}
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
