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
  div.className = 'row';
  div.innerHTML = productElement;

  productListElement.appendChild(div);
};
