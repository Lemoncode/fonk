import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  onValidateField,
  onValidateForm,
  addProduct,
} from './helpers';

const fieldIds = ['products'];
const createEmptyValues = () => ({
  products: [],
});
const createEmptyProduct = () => ({
  name: '',
  quantity: '',
  price: '',
});

let values = createEmptyValues();

const setValues = (newValues, index) => {
  values = { ...newValues };
  const nameElement = document.getElementById(`products[${index}].name`);
  nameElement.value = values.products[index].name;
  const quantityElement = document.getElementById(
    `products[${index}].quantity`
  );
  quantityElement.value = values.products[index].quantity;
  const priceElement = document.getElementById(`products[${index}].price`);
  priceElement.value = values.products[index].price;
};

const addButton = document.getElementById('add-button');
addButton.onclick = () => {
  const index = values.products.length;
  addProduct(index);
  const newProduct = createEmptyProduct();
  values = { products: [...values.products, newProduct] };

  onValidateField(`products[${index}].name`, event => {
    const value = event.target.value;
    const product = { ...values.products[index], name: value };
    const products = values.products.map((p, i) => (i === index ? product : p));
    setValues({ ...values, products }, index);

    formValidation
      .validateField(`products[${index}].name`, value)
      .then(validationResult => {
        setErrors({ ...errors, [`products[${index}].name`]: validationResult });
      });
  });
};

let errors = {};
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(Object.keys(errors));
  set(errors);
  const errorElement = document.getElementById('errors');
  errorElement.textContent = JSON.stringify(errors, null, 2);
};

onValidateForm('form', () => {
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
});
