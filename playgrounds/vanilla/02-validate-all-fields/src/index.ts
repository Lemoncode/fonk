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

const INITIAL_ERRORS: Errors<MyForm> = {
  firstName: undefined,
  lastName: undefined,
  age: undefined,
};

onChange<MyForm>('firstName', async value => {
  values = setValues({ ...values, firstName: value });
});

onChange<MyForm>('lastName', async value => {
  values = setValues({ ...values, lastName: value });
});

onChange<MyForm>('age', async value => {
  values = setValues({ ...values, age: value === '' ? undefined : Number(value) });
});

onSubmit(async () => {
  const errors = await fonk.validateAll(values);
  if (errors) {
    setErrors<MyForm>(errors);
  } else {
    window.alert(JSON.stringify(values, null, 2));
    setErrors(INITIAL_ERRORS);
  }
});

onReset(() => {
  values = setValues(INITIAL_VALUES);
  setErrors(INITIAL_ERRORS);
});
