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

export const addProduct = index => {
  const productListElement = document.getElementById('products');
  const productElement = `
    <button id="products[${index}]-remove-button" type="button">
      -
    </button>
    <div class="input">
      <input id="products[${index}].name" type="text" placeholder="Name" />
      <span class="input-feedback" id="products[${index}].name-error"></span>
    </div>
    <div class="input">
      <input id="products[${index}].quantity" type="text" placeholder="Quantity" />
      <span class="input-feedback" id="products[${index}].quantity-error"></span>
    </div>
    <div class="input">
      <input id="products[${index}].price" type="text" placeholder="Price" />
      <span class="input-feedback" id="products[${index}].price-error"></span>
    </div>
`;
  const div = document.createElement('div');
  div.id = `products[${index}]`;
  div.className = 'row';
  div.innerHTML = productElement;

  productListElement.appendChild(div);
};

export const removeProduct = (products, index, onAddHandlers) => {
  const productElement = document.getElementById(`products[${index}]`);
  productElement.remove();

  products.forEach((_, i) => {
    if (i >= index) {
      const oldIndex = i + 1;
      const container = document.getElementById(`products[${oldIndex}]`);
      container.id = `products[${i}]`;
      const removeButton = document.getElementById(
        `products[${oldIndex}]-remove-button`
      );
      removeButton.id = `products[${i}]-remove-button`;
      const name = document.getElementById(`products[${oldIndex}].name`);
      name.id = `products[${i}].name`;
      const nameError = document.getElementById(
        `products[${oldIndex}].name-error`
      );
      nameError.id = `products[${i}].name-error`;
      const quantity = document.getElementById(
        `products[${oldIndex}].quantity`
      );
      quantity.id = `products[${i}].quantity`;
      const quantityError = document.getElementById(
        `products[${oldIndex}].quantity-error`
      );
      quantityError.id = `products[${i}].quantity-error`;
      const price = document.getElementById(`products[${oldIndex}].price`);
      price.id = `products[${i}].price`;
      const priceError = document.getElementById(
        `products[${oldIndex}].price-error`
      );
      priceError.id = `products[${i}].price-error`;

      onAddHandlers(i);
    }
  });
};
