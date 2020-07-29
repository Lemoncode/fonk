import './styles.scss';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  onValidateField,
  onValidateForm,
  addProduct,
  removeProduct,
} from './helpers';

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
  const nameElement: any = document.getElementById(`products[${index}].name`);
  nameElement.value = values.products[index].name;
  const quantityElement: any = document.getElementById(
    `products[${index}].quantity`
  );
  quantityElement.value = values.products[index].quantity;
  const priceElement: any = document.getElementById(`products[${index}].price`);
  priceElement.value = values.products[index].price;
};

const handleValidateField = (index, fieldName) => {
  onValidateField(`products[${index}].${fieldName}`, event => {
    const value = event.target.value;
    const product = { ...values.products[index], [fieldName]: value };
    const products = values.products.map((p, i) => (i === index ? product : p));
    setValues({ ...values, products }, index);

    formValidation
      .validateField(`products`, values.products)
      .then(validationResult => {
        setErrors({
          ...errors,
          [`products[${index}].${fieldName}`]: validationResult[
            `products[${index}].${fieldName}`
          ],
        });
      });
  });
};

const onAddHandlers = index => {
  const removeButton = document.getElementById(
    `products[${index}]-remove-button`
  );
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

const addButton = document.getElementById('add-button');
addButton.onclick = () => {
  const index = values.products.length;
  addProduct(index);
  const newProduct = createEmptyProduct();
  values = { products: [...values.products, newProduct] };
  onAddHandlers(index);
};

let errors = {};
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(Object.keys(errors));
  set(errors);
  const errorElement = document.getElementById('errors');
  errorElement.textContent = JSON.stringify(errors, null, 2);
};

const handleValidateForm = () => {
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
  });
};
onValidateForm('form', handleValidateForm);
