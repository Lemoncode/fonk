export const setErrorsByIds = ids => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-error`);
    element.textContent = newErrors[id].message;
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
