import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Styles from './styles';
import { LanguageProvider, TranslationProvider, LanguageContext } from './i18n';
import { formValidation } from './form-validation';
import { languageList } from './i18n/languages';
import { keys } from './translations';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const App = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  const { t } = useTranslation();
  return (
    <Styles>
      <h1>Form Validation with Fonk and React Final Form Example</h1>
      <h2>i18n error message</h2>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          language,
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="user"
              validate={(value, _, meta) =>
                formValidation.validateField(meta.name, value)
              }
            >
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.user)}</label>
                  <input {...input} type="text" placeholder={t(keys.user)} />
                  {meta.error && meta.touched && (
                    <span>{t(meta.error.type)}</span>
                  )}
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
                    type="text"
                    placeholder={t(keys.password)}
                  />
                  {meta.error && meta.touched && (
                    <span>{t(meta.error.type)}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="language">
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.language)}</label>
                  <select
                    {...input}
                    onChange={e => {
                      setLanguage(e.target.value);
                      input.onChange(e);
                    }}
                  >
                    {languageList.map(l => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
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
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </LanguageProvider>,
  document.getElementById('root')
);
