import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['product.name'];
const createEmptyValues = () => ({
  product: {
    name: '',
  },
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const element = document.getElementById('product.name');
  element.value = values.product.name;
  const result = document.getElementById('result');
  result.textContent = JSON.stringify(newValues, null, 2);
};

const createEmptyErrors = () => ({
  'product.name': createDefaultValidationResult(),
});

let errors = createEmptyErrors();
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(fieldIds);
  set(errors);
};

onValidateForm('form', () => {
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
});

onValidateField('product.name', event => {
  const value = event.target.value;
  setValues({
    ...values,
    product: {
      ...values.product,
      name: value,
    },
  });

  formValidation.validateField('product.name', value).then(validationResult => {
    setErrors({ ...errors, 'product.name': validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
