import './styles.css';
import { DeepKey, Errors, getFonk, Validators } from '@lemoncode/fonk';
import { createRoot } from 'react-dom/client';
import React from 'react';

interface MyForm {
  firstName: string;
  lastName: string;
  age: number | undefined;
}

const fonk = getFonk<MyForm>({
  firstName: [Validators.required()],
  lastName: [Validators.required()],
  age: [
    ({ value }) => (Number.isInteger(value) ? undefined : 'Must be an integer'),
    ({ value }) => (value === undefined || value >= 18 ? undefined : 'Must be at least 18'),
  ],
});

const INITIAL_VALUES: MyForm = {
  firstName: '',
  lastName: '',
  age: 0,
};
const INITIAL_ERRORS: Errors<MyForm> = {
  firstName: undefined,
  lastName: undefined,
  age: undefined,
};

const App = () => {
  const [values, setValues] = React.useState<MyForm>(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<Errors<MyForm>>(INITIAL_ERRORS);

  const onChange = (fieldName: DeepKey<MyForm>) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedValue = fieldName === 'age' ? (value === '' ? undefined : Number(value)) : value;
    setValues({ ...values, [fieldName]: parsedValue });
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
      <h2>Validate all fields</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={values.firstName}
            onChange={onChange('firstName')}
          />
          <span data-testid="firstName-error">{errors?.firstName}</span>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={values.lastName}
            onChange={onChange('lastName')}
          />
          <span data-testid="lastName-error">{errors?.lastName}</span>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" placeholder="Age" value={values.age} onChange={onChange('age')} />
          <span data-testid="age-error">{errors?.age}</span>
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
