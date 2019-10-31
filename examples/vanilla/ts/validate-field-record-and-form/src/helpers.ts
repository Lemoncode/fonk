export const setValuesByIds = (ids: string[]) => newValues => {
  ids.forEach(id => {
    const element: any = document.getElementById(id);
    if (element) {
      element.value = newValues[id];
      element.checked = newValues[id];
    }
  });
  const result = document.getElementById('result');
  result.textContent = JSON.stringify(newValues, null, 2);
};

export const setErrorsByIds = (ids: string[]) => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-error`);
    if (element) {
      element.textContent = newErrors[id] ? newErrors[id].message : '';
    }
  });
};

export const setRecordErrorsByIds = (ids: string[]) => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-record-error`);
    if (element) {
      element.textContent = newErrors[id] ? newErrors[id].message : '';
    }
  });
};

export const onValidateForm = (id: string, callback: () => void) => {
  const element = document.getElementById(id);
  element.onsubmit = e => {
    e.preventDefault();
    callback();
  };
};

export const onValidateField = (id: string, callback: (event) => void) => {
  const element = document.getElementById(id);
  element.oninput = event => callback(event);
  element.onblur = event => callback(event);
};
