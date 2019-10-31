export const setValuesByIds = ids => newValues => {
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.value = newValues[id];
      element.checked = newValues[id];
    }
  });
  const result = document.getElementById('result');
  result.textContent = JSON.stringify(newValues, null, 2);
};

export const setErrorsByIds = ids => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-error`);
    if (element) {
      element.textContent = newErrors[id] ? newErrors[id].message : '';
    }
  });
};

export const setRecordErrorsByIds = ids => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-record-error`);
    if (element) {
      element.textContent = newErrors[id] ? newErrors[id].message : '';
    }
  });
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
  element.oninput = event => callback(event);
  element.onblur = event => callback(event);
};
