import './styles.css';
import { Errors, getFonk, Validators } from '@lemoncode/fonk';
import { createRoot } from 'react-dom/client';
import React from 'react';

interface Review {
  comment: string;
}

interface Product {
  name: string;
  quantity: number;
  reviews: Review[];
}

interface MyForm {
  products: Product[];
}

const fonk = getFonk<MyForm>({
  'products[i].name': [Validators.required()],
  'products[i].quantity': [({ value }) => (Number.isInteger(value) ? undefined : 'Must be an integer')],
  'products[i].reviews[i].comment': [Validators.required()],
});

const INITIAL_VALUES: MyForm = {
  products: [],
};
const INITIAL_ERRORS: Errors<MyForm> = {};

const App = () => {
  const [values, setValues] = React.useState<MyForm>(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<Errors<MyForm>>(INITIAL_ERRORS);

  const onAddProduct = () => {
    const newProduct: Product = {
      name: '',
      quantity: 0,
      reviews: [],
    };
    setValues({ ...values, products: [...values.products, newProduct] });
  };

  const onRemoveProduct = (index: number) => {
    const newProducts: Product[] = [...values.products];
    newProducts.splice(index, 1);
    setValues({ ...values, products: newProducts });
    const newErrors: Errors<MyForm> = { ...errors };
    delete newErrors[`products[${index}].name`];
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await fonk.validateAll(values);
    if (errors) {
      setErrors(errors);
    } else {
      window.alert(JSON.stringify(values, null, 2));
      setErrors(INITIAL_ERRORS);
    }
  };

  const onReset = () => {
    setValues(INITIAL_VALUES);
    setErrors(INITIAL_ERRORS);
  };

  return (
    <main className="app">
      <h1>Fonk and React</h1>
      <h2>Validate array fields</h2>
      <form onSubmit={onSubmit}>
        <button type="button" onClick={onAddProduct}>
          Add product
        </button>
        <div>
          {values.products.map((product, index) => (
            <div key={index}>
              <button type="button" onClick={() => onRemoveProduct(index)}>
                -
              </button>
              <div className="input">
                <input
                  type="text"
                  placeholder="Product name"
                  value={product.name}
                  onChange={async event => {
                    const value = event.target.value;
                    setValues({
                      ...values,
                      products: values.products.map((p, i) => (i === index ? { ...p, name: value } : p)),
                    });
                    const error = await fonk.validateField(`products[${index}].name`, value);
                    setErrors({ ...errors, [`products[${index}].name`]: error });
                  }}
                  onBlur={async event => {
                    const value = event.target.value;
                    const error = await fonk.validateField(`products[${index}].name`, value);
                    setErrors({ ...errors, [`products[${index}].name`]: error });
                  }}
                />
                <span>{errors?.[`products[${index}].name`]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={onReset}>
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>
          {JSON.stringify(errors, (_, value) => (value === undefined ? '__undefined' : value), 2).replace(
            /"__undefined"/g,
            'undefined'
          )}
        </pre>
      </form>
    </main>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
