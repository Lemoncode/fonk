import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['firstName', 'lastName', 'age'];
const createEmptyValues = () => ({
  firstName: '',
  lastName: '',
  age: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyErrors = () => ({
  firstName: createDefaultValidationResult(),
  lastName: createDefaultValidationResult(),
  age: createDefaultValidationResult(),
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

onValidateField('firstName', event => {
  const value = event.target.value;
  setValues({ ...values, firstName: value });

  formValidation.validateField('firstName', value).then(validationResult => {
    setErrors({ ...errors, firstName: validationResult });
  });
});

onValidateField('lastName', event => {
  const value = event.target.value;
  setValues({ ...values, lastName: value });

  formValidation.validateField('lastName', value).then(validationResult => {
    setErrors({ ...errors, lastName: validationResult });
  });
});

onValidateField('age', event => {
  const value = event.target.value;
  setValues({ ...values, age: value });

  formValidation.validateField('age', value).then(validationResult => {
    setErrors({ ...errors, age: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
