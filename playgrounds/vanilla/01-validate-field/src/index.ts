import './styles.css';
import { Errors, getFonk, Validators } from '@lemoncode/fonk';
import { setValues, setErrors, onChange, onSubmit, onReset } from './helpers';

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

let values: MyForm = INITIAL_VALUES;
setValues(values);

const INITIAL_ERRORS: Errors<MyForm> = {
  firstName: undefined,
  lastName: undefined,
  age: undefined,
};

let errors: Errors<MyForm> = INITIAL_ERRORS;

onChange<MyForm>('firstName', async value => {
  values = setValues({ ...values, firstName: value });
  const error = await fonk.validateField('firstName', value);
  errors = setErrors<MyForm>({ ...errors, firstName: error });
});

onChange<MyForm>('lastName', async value => {
  values = setValues({ ...values, lastName: value });
  const error = await fonk.validateField('lastName', value);
  errors = setErrors<MyForm>({ ...errors, lastName: error });
});

onChange<MyForm>('age', async value => {
  const age = value === '' ? undefined : Number(value);
  values = setValues({ ...values, age });
  const error = await fonk.validateField('age', age);
  errors = setErrors<MyForm>({ ...errors, age: error });
});

onSubmit(() => {
  window.alert(JSON.stringify(values, null, 2));
});

onReset(() => {
  values = setValues(INITIAL_VALUES);
  errors = setErrors(INITIAL_ERRORS);
});
