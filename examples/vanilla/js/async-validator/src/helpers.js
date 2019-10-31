let errors;

export const getErrors = initialValue => {
  errors = { ...initialValue };
  return errors;
};

export const setErrorsByIds = ids => newErrors => {
  errors = { ...newErrors };
  ids.forEach(id => {
    const element = document.getElementById(`${id}-error`);
    element.textContent = errors[id].message;
  });
};

let values;

export const getValues = initialValue => {
  values = { ...initialValue };
  return values;
};

export const setValuesByIds = ids => newValues => {
  values = { ...newValues };
  ids.forEach(id => {
    const element = document.getElementById(id);
    element.value = values[id];
  });
  const result = document.getElementById('result');
  result.textContent = JSON.stringify(values, null, 2);
};

export const onValidateForm = (id, callback) => {
  const element = document.getElementById(id);
  element.onsubmit = e => {
    e.preventDefault();
    callback();
  };
};

export const onValidateField = (id, callback) => {
  const element = document.getElementById(id);
  element.value = values[id];
  element.oninput = event => callback(event);
  element.onblur = event => callback(event);
};
