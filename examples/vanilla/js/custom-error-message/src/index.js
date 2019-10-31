import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const createEmptyValues = () => ({
  product: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(['product']);
  set(values);
};

const createEmptyErrors = () => ({
  product: createDefaultValidationResult(),
});

let errors = createEmptyErrors();
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(['product']);
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

onValidateField('product', event => {
  const value = event.target.value;
  setValues({ ...values, product: value });

  formValidation.validateField('product', value).then(validationResult => {
    setErrors({ ...errors, product: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
