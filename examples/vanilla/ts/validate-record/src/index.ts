import './styles.scss';
import { createDefaultValidationResult } from '@lemoncode/fonk';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  setRecordErrorsByIds,
  setValuesByIds,
  onValidateField,
  onValidateForm,
} from './helpers';

const fieldIds = ['product', 'discount', 'price', 'isPrime'];
const recordIds = ['freeShipping'];
const createEmptyValues = () => ({
  product: '',
  discount: '',
  price: '',
  isPrime: false,
});

let values = createEmptyValues();

const setValues = newValues => {
  values = { ...newValues };
  const set = setValuesByIds(fieldIds);
  set(values);
};

const createEmptyRecordErrors = () => ({
  freeShipping: createDefaultValidationResult(),
});
let recordErrors = createEmptyRecordErrors();

const setRecordErrors = newErrors => {
  recordErrors = { ...newErrors };
  const set = setRecordErrorsByIds(recordIds);
  set(recordErrors);
};

onValidateForm('form', () => {
  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
    if (validationResult.succeeded) {
      window.alert(JSON.stringify(values, null, 2));
    }
  });
});

onValidateField('product', event => {
  const value = event.target.value;
  setValues({ ...values, product: value });
});

onValidateField('discount', event => {
  const value = event.target.value;
  setValues({ ...values, discount: value });

  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

onValidateField('price', event => {
  const value = event.target.value;
  setValues({ ...values, price: value });

  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

onValidateField('isPrime', event => {
  const value = event.target.checked;
  setValues({ ...values, isPrime: value });
  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

const resetButton = document.getElementById('reset-button');
resetButton.onclick = () => {
  setValues(createEmptyValues());
  setRecordErrors(createEmptyRecordErrors());
};
