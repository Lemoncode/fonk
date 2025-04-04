import './styles.css';
import { getFonk, Validators } from '@lemoncode/fonk';
import { setValues, setErrors, onChange, onSubmit, onReset } from './helpers';

interface MyForm {
  firstName: string;
  lastName: string;
  age: number | undefined;
}

const fonk = getFonk<MyForm>({
  firstName: [Validators.required({ message: 'Required' })],
  lastName: [Validators.required({ message: 'Required' })],
  age: [
    ({ value }) => (Number.isInteger(value) ? undefined : 'Must be an integer'),
    ({ value }) => (value === undefined || value >= 18 ? undefined : 'Must be at least 18'),
  ],
});

const values: MyForm = {
  firstName: '',
  lastName: '',
  age: undefined,
};

const errors = {};

onChange<MyForm>('firstName', async value => {
  setValues({ ...values, firstName: value });
  const error = await fonk.validateField('firstName', value);
  setErrors({ ...errors, firstName: error });
});

onChange<MyForm>('lastName', async value => {
  setValues({ ...values, lastName: value });
  const error = await fonk.validateField('lastName', value);
  setErrors({ ...errors, lastName: error });
});

onChange<MyForm>('age', async value => {
  setValues({ ...values, age: value });
  const error = await fonk.validateField('age', value === '' ? undefined : Number(value));
  setErrors({ ...errors, age: error });
});

onSubmit(() => {
  window.alert(JSON.stringify(values, null, 2));
});

onReset(() => {
  setValues({ firstName: '', lastName: '', age: 0 });
  setErrors({ firstName: undefined, lastName: undefined, age: undefined });
});
