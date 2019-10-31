import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setRecordErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['subtotal', 'discount'];
const recordIds = ['freeShippingValidation'];
const createEmptyValues = () => ({
  subtotal: '',
  discount: '',
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyErrors = () => ({
  freeShippingValidation: createDefaultValidationResult(),
});

let recordErrors = createEmptyErrors();
const setRecordErrors = newErrors => {
  recordErrors = { ...newErrors };
  const set = setRecordErrorsByIds(recordIds);
  set(recordErrors);
};

onValidateForm('form', () => {
  formValidation.validateForm(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
});

onValidateField('subtotal', event => {
  const value = event.target.value;
  setValues({ ...values, subtotal: value });

  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

onValidateField('discount', event => {
  const value = event.target.value;
  setValues({ ...values, discount: value });

  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setRecordErrors(createEmptyErrors());
};
