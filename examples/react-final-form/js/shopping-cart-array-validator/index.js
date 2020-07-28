import React from "react";
import { render } from "react-dom";
import Styles from "./styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { formValidation } from "./form-validation";

const onSubmit = values => {
  console.log({ values });
};

const createEmptyProduct = () => ({
  name: "",
  quantity: "",
  price: ""
});

const App = () => (
  <Styles>
    <h1>Validating a product list in shopping cart</h1>
    <span>Add new products and check validations:</span>
    <Form
      onSubmit={onSubmit}
      initialValues={{ products: [] }}
      validate={formValidation.validateForm}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="products"
            render={({ fields }) => (
              <React.Fragment>
                <button
                  type="button"
                  onClick={() => fields.push(createEmptyProduct())}
                >
                  Add product
                </button>
                {values.products.map((_, index) => (
                  <div className="row">
                    <button type="button" onClick={() => fields.remove(index)}>
                      -
                    </button>
                    <Field name={`products[${index}].name`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input {...input} type="text" placeholder="Name" />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name={`products[${index}].quantity`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input
                            {...input}
                            type="text"
                            placeholder="Quantity"
                          />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <Field name={`products[${index}].price`}>
                      {({ input, meta }) => (
                        <div className="input">
                          <input {...input} type="text" placeholder="Price" />
                          {meta.error && meta.touched && (
                            <span className="input-feedback">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                ))}
              </React.Fragment>
            )}
          />

          <button type="submit">Submit</button>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </form>
      )}
    />
  </Styles>
);

render(<App />, document.getElementById("root"));
