export const setErrorsByIds = (ids: string[]) => newErrors => {
  ids.forEach(id => {
    const element = document.getElementById(`${id}-error`);
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
