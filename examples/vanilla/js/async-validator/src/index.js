import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  getErrors,
  setErrorsByIds,
  getValues,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const createEmptyValues = () => ({
  user: '',
});

let values = getValues(createEmptyValues());

const setValues = setValuesByIds(['user']);

const createEmptyErrors = () => ({
  user: createDefaultValidationResult(),
});

let errors = getErrors(createEmptyErrors());
const setErrors = setErrorsByIds(['user']);

onValidateForm('form', () => {
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
});

onValidateField('user', event => {
  const value = event.target.value;
  setValues({ ...values, user: value });

  formValidation.validateField('user', value).then(validationResult => {
    setErrors({ ...errors, user: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
