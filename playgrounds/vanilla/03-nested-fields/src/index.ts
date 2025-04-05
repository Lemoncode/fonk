import './styles.css';
import { Errors, getFonk, Validators } from '@lemoncode/fonk';
import { setValues, setErrors, onChange, onSubmit, onReset } from './helpers';

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

let values: MyForm = INITIAL_VALUES;

const INITIAL_ERRORS: Errors<MyForm> = {
  email: undefined,
  'address.street': undefined,
  'address.city': undefined,
};

let errors: Errors<MyForm> = INITIAL_ERRORS;

onChange<MyForm>('email', async value => {
  values = setValues({ ...values, email: value });
  const error = await fonk.validateField('email', value);
  errors = setErrors<MyForm>({ ...errors, email: error });
});

onChange<MyForm>('address.street', async value => {
  values = setValues({ ...values, address: { ...values.address, street: value } });
  const error = await fonk.validateField('address.street', value);
  errors = setErrors<MyForm>({ ...errors, 'address.street': error });
});

onChange<MyForm>('address.city', async value => {
  values = setValues({ ...values, address: { ...values.address, city: value } });
  const error = await fonk.validateField('address.city', value);
  errors = setErrors<MyForm>({ ...errors, 'address.city': error });
});

onSubmit(async () => {
  const newErrors = await fonk.validateAll(values);
  if (newErrors) {
    errors = setErrors<MyForm>(newErrors);
  } else {
    window.alert(JSON.stringify(values, null, 2));
    errors = setErrors(INITIAL_ERRORS);
  }
});

onReset(() => {
  values = setValues(INITIAL_VALUES);
  errors = setErrors(INITIAL_ERRORS);
});
