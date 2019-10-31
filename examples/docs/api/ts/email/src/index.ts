import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['email'];
const createEmptyValues = () => ({
  email: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyErrors = () => ({
  email: createDefaultValidationResult(),
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

onValidateField('email', event => {
  const value = event.target.value;
  setValues({ ...values, email: value });

  formValidation.validateField('email', value).then(validationResult => {
    setErrors({ ...errors, email: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
