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
    <h1>
      Validate field, record and form with Fonk and React Final Form Example
    </h1>
    <h2>validateField + validateRecord approach:</h2>
    <Form
      onSubmit={onSubmit}
      validate={values =>
        formValidation
          .validateRecord(values)
          .then(validationResult =>
            validationResult ? validationResult.recordErrors : null
          )
      }
      render={({
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="product"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
            type="text"
          >
            {({ input, meta }) => (
              <div>
                <label>Product</label>
                <input {...input} placeholder="Product" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="discount"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
            type="number"
          >
            {({ input, meta }) => (
              <div>
                <label>Discount</label>
                <input {...input} placeholder="Discount" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="price"
            validate={(value, _, meta) =>
              formValidation.validateField(meta.name, value)
            }
            type="number"
          >
            {({ input, meta }) => (
              <div>
                <label>Price</label>
                <input {...input} placeholder="Price" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
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
          {errors.freeShipping && <span>{errors.freeShipping.message}</span>}
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
    <h2>validateForm approach:</h2>
    <Form
      onSubmit={onSubmit}
      validate={values =>
        formValidation.validateForm(values).then(validationResult =>
          validationResult
            ? {
                ...validationResult.fieldErrors,
                ...validationResult.recordErrors,
              }
            : null
        )
      }
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
            {({ input, meta }) => (
              <div>
                <label>Product</label>
                <input {...input} placeholder="Product" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="discount" type="number">
            {({ input, meta }) => (
              <div>
                <label>Discount</label>
                <input {...input} placeholder="Discount" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
              </div>
            )}
          </Field>
          <Field name="price" type="number">
            {({ input, meta }) => (
              <div>
                <label>Price</label>
                <input {...input} placeholder="Price" />
                {meta.error && meta.touched && (
                  <span>{meta.error.message}</span>
                )}
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
          {errors.freeShipping && <span>{errors.freeShipping.message}</span>}
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
