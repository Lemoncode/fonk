import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';

const createEmptyValues = () => ({
  user: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const userInput = document.getElementById('user');
  userInput.value = values.user;
  const result = document.getElementById('result');
  result.textContent = JSON.stringify(values, null, 2);
};

const createEmptyErrors = () => ({
  user: createDefaultValidationResult(),
});

let errors = createEmptyErrors();

const setErrors = newErrors => {
  errors = { ...newErrors };

  const userErrors = document.getElementById('user-error');
  userErrors.textContent = errors.user.message;
};

const form = document.getElementById('form');

form.onsubmit = e => {
  e.preventDefault();
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
};

const userInput = document.getElementById('user');
userInput.value = values.user;
userInput.oninput = e => {
  const value = e.target.value;
  setValues({ ...values, user: value });
  formValidation.validateField('user', value).then(validationResult => {
    setErrors({ ...errors, user: validationResult });
  });
};

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
