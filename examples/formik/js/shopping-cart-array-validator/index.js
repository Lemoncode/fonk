import "./helper.css";

import React from "react";
import { render } from "react-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { formValidation } from "./form-validation";

const createEmptyProduct = () => ({
  name: "",
  quantity: "",
  price: ""
});

const App = () => (
  <div>
    <h1>Validating a product list in shopping cart</h1>
    <span>Add new products and check validations:</span>
    <Formik
      initialValues={{ products: [] }}
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
                  onClick={() => arrayHelpers.push(createEmptyProduct)}
                >
                  Add product
                </button>
                {values.products.map((_, index) => (
                  <div>
                    <Field type="text" name={`products[${index}].name`} />
                    <ErrorMessage
                      name={`products[${index}].name`}
                      component="div"
                    />
                    <Field type="text" name={`products[${index}].quantity`} />
                    <ErrorMessage
                      name={`products[${index}].quantity`}
                      component="div"
                    />
                    <Field type="text" name={`products[${index}].price`} />
                    <ErrorMessage
                      name={`products[${index}].price`}
                      component="div"
                    />
                  </div>
                ))}
              </div>
            )}
          />

          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

render(<App />, document.getElementById("root"));
