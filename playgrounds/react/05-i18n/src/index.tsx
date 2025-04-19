import './styles.css';
import { DeepKey, DeepValue, Errors, getFonk, Validators } from '@lemoncode/fonk';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { type Translations, useI18n, I18nProvider, I18nContext, Locale } from './i18n';
import { useCommonValidators } from './common-i18n';

interface MyForm {
  email: string;
  password: string;
}

const validatorTranslations: Translations<{ minLength: string }> = {
  en: {
    minLength: 'The password must be at least 8 characters long',
  },
  es: {
    minLength: 'La contraseña debe tener al menos 8 caracteres',
  },
};

const useFonk = () => {
  const { required, email } = useCommonValidators();
  const myFormI18n = useI18n(validatorTranslations);

  const fonk = getFonk<MyForm>({
    email: [required(), email()],
    password: [required({ trim: false }), Validators.minLength({ message: myFormI18n.get('minLength'), length: 8 })],
  });

  return fonk;
};

const INITIAL_VALUES: MyForm = {
  email: '',
  password: '',
};
const INITIAL_ERRORS: Errors<MyForm> = {
  email: undefined,
  password: undefined,
};

const App = () => {
  const fonk = useFonk();
  const { locale, setLocale } = React.use(I18nContext);
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
      <h2>i18n</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="locale">Locale</label>
          <select
            id="locale"
            value={locale}
            onChange={event => {
              const value = event.target.value;
              setLocale(value as Locale);
              onReset();
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={async event => {
              const value = event.target.value;
              setValues({ ...values, password: value });
              await validateField('password', value);
            }}
            onBlur={async () => await validateField('password', values.password)}
          />
          <span data-testid="password-error">{errors?.password}</span>
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
root.render(
  <I18nProvider>
    <App />
  </I18nProvider>
);
