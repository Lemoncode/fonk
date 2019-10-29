import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Styles from './styles';
import { LanguageProvider } from './i18n';
import { useValidation } from './validation';
import { keys } from './translations';
import { FlagContainer } from './components';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const App = () => {
  const { t } = useTranslation();
  const { formValidation } = useValidation();
  return (
    <Styles>
      <h1>Form Validation with Fonk and React Final Form Example</h1>
      <h2>i18n local error message</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <FlagContainer />
            <Field
              name="user"
              validate={(value, _, meta) =>
                formValidation.validateField(meta.name, value)
              }
            >
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.user)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.user)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="password"
              validate={(value, _, meta) =>
                formValidation.validateField(meta.name, value)
              }
            >
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.password)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.password)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                {t(keys.submit)}
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                {t(keys.reset)}
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  );
};

render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('root')
);
