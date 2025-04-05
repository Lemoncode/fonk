import './styles.css';
import { Errors, getFonk, Validators } from '@lemoncode/fonk';
import { setValues, setErrors, onChange, onSubmit, onReset, addProduct, removeProduct } from './helpers';

interface Review {
  comment: string;
}

interface Product {
  name: string;
  quantity: number;
  reviews: Review[];
}

interface MyForm {
  products: Product[];
}

const fonk = getFonk<MyForm>({
  'products[i].name': [Validators.required()],
  'products[i].quantity': [({ value }) => (Number.isInteger(value) ? undefined : 'Must be an integer')],
  'products[i].reviews[i].comment': [Validators.required()],
});

const INITIAL_VALUES: MyForm = {
  products: [],
};

let values: MyForm = INITIAL_VALUES;
setValues(values);

const INITIAL_ERRORS: Errors<MyForm> = {
  'products[i].name': undefined,
  'products[i].quantity': undefined,
  'products[i].reviews[i].comment': undefined,
};

let errors: Errors<MyForm> = INITIAL_ERRORS;
const onAddHandlers = (index: number) => {
  const removeButton = document.getElementById(`products[${index}]-remove-button`);
  removeButton.onclick = () => {
    const newProducts = [...values.products];
    newProducts.splice(index, 1);
    values = { products: newProducts };
    removeProduct(newProducts, index, onAddHandlers);
    handleValidateForm();
  };

  Object.keys(createEmptyProduct()).forEach(field => {
    handleValidateField(index, field);
  });
};

const addButton = document.getElementById('add-button')!;
addButton.onclick = () => {
  const index = values.products.length;
  addProduct(index);
  const newProduct: Product = {
    name: '',
    quantity: 0,
    reviews: [],
  };
  values = { products: [...values.products, newProduct] };
  onAddHandlers(index);
};

onChange<MyForm>('email', async value => {
  values = setValues({ ...values, email: value });
  const error = await fonk.validateField('email', value);
  errors = setErrors<MyForm>({ ...errors, email: error });
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
