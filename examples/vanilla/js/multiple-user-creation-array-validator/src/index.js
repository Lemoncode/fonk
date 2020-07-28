import './styles.scss';
import { formValidation } from './form-validation';
import {
  setErrorsByIds,
  onValidateField,
  onValidateForm,
  addUser,
  removeUser,
} from './helpers';

const createEmptyValues = () => ({
  users: [],
});
const createEmptyUser = () => ({
  name: '',
  email: '',
  repeatEmail: '',
});

let values = createEmptyValues();

const setValues = (newValues, index) => {
  values = { ...newValues };
  const nameElement = document.getElementById(`users[${index}].name`);
  nameElement.value = values.users[index].name;
  const emailElement = document.getElementById(`users[${index}].email`);
  emailElement.value = values.users[index].email;
  const repeatEmailElement = document.getElementById(
    `users[${index}].repeatEmail`
  );
  repeatEmailElement.value = values.users[index].repeatEmail;
};

const handleValidateField = (index, fieldName) => {
  onValidateField(`users[${index}].${fieldName}`, event => {
    const value = event.target.value;
    const user = { ...values.users[index], [fieldName]: value };
    const users = values.users.map((p, i) => (i === index ? user : p));
    setValues({ ...values, users }, index);

    formValidation
      .validateField(`users`, values.users)
      .then(validationResult => {
        setErrors({
          ...errors,
          [`users[${index}].${fieldName}`]: validationResult[
            `users[${index}].${fieldName}`
          ],
        });
      });
  });
};

const onAddHandlers = index => {
  const removeButton = document.getElementById(`users[${index}]-remove-button`);
  removeButton.onclick = () => {
    const newUsers = [...values.users];
    newUsers.splice(index, 1);
    values = { users: newUsers };
    removeUser(newUsers, index, onAddHandlers);
    handleValidateForm();
  };

  Object.keys(createEmptyUser()).forEach(field => {
    handleValidateField(index, field);
  });
};

const addButton = document.getElementById('add-button');
addButton.onclick = () => {
  debugger;
  const index = values.users.length;
  addUser(index);
  const newUser = createEmptyUser();
  values = { users: [...values.users, newUser] };
  onAddHandlers(index);
};

let errors = {};
const setErrors = newErrors => {
  errors = { ...newErrors };
  const set = setErrorsByIds(Object.keys(errors));
  set(errors);
  const errorElement = document.getElementById('errors');
  errorElement.textContent = JSON.stringify(errors, null, 2);
};

const handleValidateForm = () => {
  formValidation.validateForm(values).then(validationResult => {
    setErrors(validationResult.fieldErrors);
  });
};
onValidateForm('form', handleValidateForm);
