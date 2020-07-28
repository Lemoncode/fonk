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
      <input id="users[${index}].quantity" type="text" placeholder="Quantity" />
      <span class="input-feedback" id="users[${index}].quantity-error"></span>
    </div>
    <div class="input">
      <input id="users[${index}].price" type="text" placeholder="Price" />
      <span class="input-feedback" id="users[${index}].price-error"></span>
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
      const quantity = document.getElementById(
        `users[${oldIndex}].quantity`
      );
      quantity.id = `users[${i}].quantity`;
      const quantityError = document.getElementById(
        `users[${oldIndex}].quantity-error`
      );
      quantityError.id = `users[${i}].quantity-error`;
      const price = document.getElementById(`users[${oldIndex}].price`);
      price.id = `users[${i}].price`;
      const priceError = document.getElementById(
        `users[${oldIndex}].price-error`
      );
      priceError.id = `users[${i}].price-error`;

      onAddHandlers(i);
    }
  });
};
