import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Styles from './styles';
import { LanguageProvider, LanguageContext } from './i18n';
import { useValidation } from './validation';
import { keys } from './translations';
import { FlagContainer } from './components';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const App = () => {
  const { language } = React.useContext(LanguageContext);
  const { t } = useTranslation();
  const { formValidation } = useValidation();
  const [initialValues, setInitialValues] = React.useState({
    language,
  });

  return (
    <Styles>
      <h1>Form Validation with Fonk and React Final Form Example</h1>
      <h2>i18n full example</h2>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={values => formValidation.validateForm(values)}
        render={({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <FlagContainer
              onSelectLanguage={language =>
                setInitialValues({ ...values, language })
              }
            />
            <Field name="name">
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.name)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.name)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.email)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.email)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="landline">
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.landline)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.landline)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="mobile">
              {({ input, meta }) => (
                <div>
                  <label>{t(keys.mobile)}</label>
                  <input
                    {...input}
                    autoComplete="off"
                    type="text"
                    placeholder={t(keys.mobile)}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                {t(keys.submit)}
              </button>
              <button type="button" onClick={() => form.reset({ language })}>
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
