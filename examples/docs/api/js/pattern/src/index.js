import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['phone1', 'phone2', 'phone3'];
const createEmptyValues = () => ({
  phone1: '',
  phone2: '',
  phone3: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyErrors = () => ({
  phone1: createDefaultValidationResult(),
  phone2: createDefaultValidationResult(),
  phone3: createDefaultValidationResult(),
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

onValidateField('phone1', event => {
  const value = event.target.value;
  setValues({ ...values, phone1: value });

  formValidation.validateField('phone1', value).then(validationResult => {
    setErrors({ ...errors, phone1: validationResult });
  });
});

onValidateField('phone2', event => {
  const value = event.target.value;
  setValues({ ...values, phone2: value });

  formValidation.validateField('phone2', value).then(validationResult => {
    setErrors({ ...errors, phone2: validationResult });
  });
});

onValidateField('phone3', event => {
  const value = event.target.value;
  setValues({ ...values, phone3: value });

  formValidation.validateField('phone3', value).then(validationResult => {
    setErrors({ ...errors, phone3: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
