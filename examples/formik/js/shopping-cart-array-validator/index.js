import './helper.css';

import React from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { formValidation } from './form-validation';

const createEmptyProduct = () => ({
  name: '',
  quantity: '',
  price: '',
});

const App = () => (
  <div>
    <h1>Validating a product list in shopping cart</h1>
    <span>Add new products and check validations:</span>
    <Formik
      initialValues={{ products: [createEmptyProduct()] }}
      validate={formValidation.validateForm}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors }) => (
        <Form>
          <FieldArray
            name="products"
            render={arrayHelpers => (
              <div>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(createEmptyProduct())}
                >
                  Add product
                </button>
                {values.products.map((_, index) => (
                  <div className="row">
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                    <div className="input">
                      <Field
                        type="text"
                        name={`products[${index}].name`}
                        placeholder="Name"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`products[${index}].name`}
                        component="div"
                      />
                    </div>
                    <div className="input">
                      <Field
                        type="text"
                        name={`products[${index}].quantity`}
                        placeholder="Quantity"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`products[${index}].quantity`}
                        component="div"
                      />
                    </div>
                    <div className="input">
                      <Field
                        type="text"
                        name={`products[${index}].price`}
                        placeholder="Price"
                      />
                      <ErrorMessage
                        className="input-feedback"
                        name={`products[${index}].price`}
                        component="div"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          />

          <button type="submit">Submit</button>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById('root'));
