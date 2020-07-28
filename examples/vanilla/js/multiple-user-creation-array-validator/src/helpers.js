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

export const addUser = index => {
  const userListElement = document.getElementById('users');
  const userElement = `
    <button id="users[${index}]-remove-button" type="button">
      -
    </button>
    <div class="input">
      <input id="users[${index}].name" type="text" placeholder="Name" />
      <span class="input-feedback" id="users[${index}].name-error"></span>
    </div>
    <div class="input">
      <input id="users[${index}].email" type="text" placeholder="Email" />
      <span class="input-feedback" id="users[${index}].email-error"></span>
    </div>
    <div class="input">
      <input id="users[${index}].repeatEmail" type="text" placeholder="Repeat Email" />
      <span class="input-feedback" id="users[${index}].repeatEmail-error"></span>
    </div>
`;
  const div = document.createElement('div');
  div.id = `users[${index}]`;
  div.className = 'row';
  div.innerHTML = userElement;

  userListElement.appendChild(div);
};

export const removeUser = (users, index, onAddHandlers) => {
  const userElement = document.getElementById(`users[${index}]`);
  userElement.remove();

  users.forEach((_, i) => {
    if (i >= index) {
      const oldIndex = i + 1;
      const container = document.getElementById(`users[${oldIndex}]`);
      container.id = `users[${i}]`;
      const removeButton = document.getElementById(
        `users[${oldIndex}]-remove-button`
      );
      removeButton.id = `users[${i}]-remove-button`;
      const name = document.getElementById(`users[${oldIndex}].name`);
      name.id = `users[${i}].name`;
      const nameError = document.getElementById(
        `users[${oldIndex}].name-error`
      );
      nameError.id = `users[${i}].name-error`;
      const email = document.getElementById(
        `users[${oldIndex}].email`
      );
      email.id = `users[${i}].email`;
      const emailError = document.getElementById(
        `users[${oldIndex}].email-error`
      );
      emailError.id = `users[${i}].email-error`;
      const repeatEmail = document.getElementById(`users[${oldIndex}].repeatEmail`);
      repeatEmail.id = `users[${i}].repeatEmail`;
      const repeatEmailError = document.getElementById(
        `users[${oldIndex}].repeatEmail-error`
      );
      repeatEmailError.id = `users[${i}].repeatEmail-error`;

      onAddHandlers(i);
    }
  });
};
