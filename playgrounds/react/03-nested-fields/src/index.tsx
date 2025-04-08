import './styles.css';
import { DeepKey, DeepValue, Errors, getFonk, Validators } from '@lemoncode/fonk';
import { createRoot } from 'react-dom/client';
import React from 'react';

interface MyForm {
  email: string;
  address: {
    street: string;
    city: string;
  };
}

const fonk = getFonk<MyForm>({
  email: [Validators.required(), Validators.email()],
  'address.street': [Validators.required()],
  'address.city': [Validators.required()],
});

const INITIAL_VALUES: MyForm = {
  email: '',
  address: {
    street: '',
    city: '',
  },
};
const INITIAL_ERRORS: Errors<MyForm> = {
  email: undefined,
  'address.street': undefined,
  'address.city': undefined,
};

const App = () => {
  const [values, setValues] = React.useState<MyForm>(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<Errors<MyForm>>(INITIAL_ERRORS);

  const validateField = async (fieldName: DeepKey<MyForm>, value: DeepValue<MyForm, DeepKey<MyForm>>) => {
    const error = await fonk.validateField(fieldName, value);
    setErrors({ ...errors, [fieldName]: error });
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
      <h2>Validate nested fields</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={async event => {
              const value = event.target.value;
              setValues({ ...values, email: value });
              await validateField('email', value);
            }}
            onBlur={async () => await validateField('email', values.email)}
          />
          <span data-testid="email-error">{errors?.email}</span>
        </div>
        <div>
          <label htmlFor="address.street">Street</label>
          <input
            id="address.street"
            type="text"
            placeholder="Street"
            value={values.address.street}
            onChange={async event => {
              const value = event.target.value;
              setValues({ ...values, address: { ...values.address, street: value } });
              await validateField('address.street', value);
            }}
            onBlur={async () => await validateField('address.street', values.address.street)}
          />
          <span data-testid="address.street-error">{errors?.['address.street']}</span>
        </div>
        <div>
          <label htmlFor="address.city">City</label>
          <input
            id="address.city"
            type="text"
            placeholder="City"
            value={values.address.city}
            onChange={async event => {
              const value = event.target.value;
              setValues({ ...values, address: { ...values.address, city: value } });
              await validateField('address.city', value);
            }}
            onBlur={async () => await validateField('address.city', values.address.city)}
          />
          <span data-testid="address.city-error">{errors?.['address.city']}</span>
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
