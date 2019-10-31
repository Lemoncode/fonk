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

const createEmptyErrors = () => ({
  product: createDefaultValidationResult(),
  discount: createDefaultValidationResult(),
  price: createDefaultValidationResult(),
});

let errors = createEmptyErrors();
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(fieldIds);
  set(errors);
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
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
    setRecordErrors(validationResult.recordErrors);
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

onValidateField('discount', event => {
  const value = event.target.value;
  setValues({ ...values, discount: value });

  formValidation.validateField('discount', value).then(validationResult => {
    setErrors({ ...errors, discount: validationResult });
  });
  formValidation.validateRecord(values).then(validationResult => {
    setRecordErrors(validationResult.recordErrors);
  });
});

onValidateField('price', event => {
  const value = event.target.value;
  setValues({ ...values, price: value });

  formValidation.validateField('price', value).then(validationResult => {
    setErrors({ ...errors, price: validationResult });
  });
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
  setErrors(createEmptyErrors());
  setRecordErrors(createEmptyRecordErrors());
};
