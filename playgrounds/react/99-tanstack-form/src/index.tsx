import './styles.css';
import { getFonk, Validators } from '@lemoncode/fonk';
import { createRoot } from 'react-dom/client';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { z } from 'zod';

interface Review {
  comment: string;
}

interface Product {
  name: string;
  quantity: number;
  reviews?: Review[];
}

interface MyForm {
  name: string;
  email: string;
  client?: {
    id: string;
    name: string;
  };
  products: Product[];
}

const fonk = getFonk<MyForm>({
  name: [Validators.required()],
  email: [Validators.required(), Validators.email()],
  'client.name': [Validators.required()],
  'products[i].name': [Validators.required()],
  'products[i].quantity': [({ value }) => (Number.isInteger(value) ? undefined : 'Must be an integer')],
  // 'products[i].reviews[i].comment': [Validators.required()],
});

const ZodSchema = z.object({
  name: z.string().nonempty('Required'),
  email: z.string().email(),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <span>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <>{field.state.meta.errors.map(error => error.message).join(',')}</>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </span>
  );
}

const App = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      client: {
        id: '',
        name: '',
      },
      products: [],
    } as MyForm,
    validators: {
      // onChangeAsync: async ({ value }) => {
      //   const errors = await fonk.validateAll(value);
      //   return {
      //     fields: errors,
      //   };
      // },
      // onChangeAsync: ZodSchema,
    },
    onSubmit: ({ value }) => {
      window.alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <main className="app">
      <h1>Fonk and React</h1>
      <h2>Using Tanstack Form</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            validators={
              {
                // onChangeAsync: ({ value, fieldApi }) => fonk.validateField(fieldApi.name, value),
              }
            }
            children={field => {
              return (
                <>
                  <label htmlFor={field.name}>Name</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.currentTarget.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />

                  {/* <span data-testid={`${field.name}-error`}>{field.state.meta.errors.join(',')}</span> */}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="email"
            validators={{
              onChangeAsync: fonk.email,
              // onChangeAsync: ({ value, fieldApi }) => fonk.validateField(fieldApi.name, value),
            }}
            children={field => {
              return (
                <>
                  <label htmlFor={field.name}>Email</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.currentTarget.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldInfo field={field} />

                  {/* <span data-testid={`${field.name}-error`}>{field.state.meta.errors.join(',')}</span> */}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field name="products" mode="array">
            {field => {
              return (
                <div>
                  {field.state.value.map((_, i) => {
                    return (
                      <form.Field
                        key={i}
                        name={`products[${i}].name`}
                        validators={{
                          onChangeAsync: async ({ value, fieldApi }) => {
                            const error = await fonk.validateField(fieldApi.name as any, value);
                            console.log(fieldApi.name, error);
                            return error;
                          },
                        }}
                      >
                        {subField => {
                          return (
                            <div>
                              <label>
                                <div>Name for product {i}</div>
                                <input
                                  value={subField.state.value}
                                  onChange={e => subField.handleChange(e.target.value)}
                                />
                              </label>
                              <FieldInfo field={subField} />
                            </div>
                          );
                        }}
                      </form.Field>
                    );
                  })}
                  <button onClick={() => field.pushValue({ name: '', quantity: 0 })} type="button">
                    Add product
                  </button>
                </div>
              );
            }}
          </form.Field>
        </div>
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="buttons">
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button type="reset" onClick={() => form.reset()}>
                Reset
              </button>
            </div>
          )}
        />
        <pre>{JSON.stringify(form.state.values, null, 2)}</pre>
        <pre>
          {JSON.stringify(form.state.errors, (_, value) => (value === undefined ? '__undefined' : value), 2).replace(
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
