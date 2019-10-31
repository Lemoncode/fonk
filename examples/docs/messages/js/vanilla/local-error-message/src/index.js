import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['ibanAccount', 'bicAccount'];
const createEmptyValues = () => ({
  ibanAccount: '',
  bicAccount: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyErrors = () => ({
  ibanAccount: createDefaultValidationResult(),
  bicAccount: createDefaultValidationResult(),
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

onValidateField('ibanAccount', event => {
  const value = event.target.value;
  setValues({ ...values, ibanAccount: value });

  formValidation.validateField('ibanAccount', value).then(validationResult => {
    setErrors({ ...errors, ibanAccount: validationResult });
  });
});

onValidateField('bicAccount', event => {
  const value = event.target.value;
  setValues({ ...values, bicAccount: value });

  formValidation.validateField('bicAccount', value).then(validationResult => {
    setErrors({ ...errors, bicAccount: validationResult });
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setErrors(createEmptyErrors());
};
