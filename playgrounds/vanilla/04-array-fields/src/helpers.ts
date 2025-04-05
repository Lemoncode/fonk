import { DeepKey, Errors } from '@lemoncode/fonk';

export const setValues = <Model extends Record<string, any>>(values: Model): Model => {
  const flattenedValues = Object.entries(values).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          acc[`${key}.${nestedKey}`] = nestedValue;
        });
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );
  Object.entries(flattenedValues).forEach(([key, value]) => {
    const element = document.getElementById(key) as HTMLInputElement;
    if (element) {
      element.value = value;
      element.checked = value;
    }
  });
  const result = document.getElementById('result');
  if (result) {
    result.textContent = JSON.stringify(values, null, 2);
  }
  return values;
};

export const setErrors = <Model>(errors: Errors<Model>): Errors<Model> => {
  if (errors) {
    Object.entries(errors).forEach(entry => {
      const [key, error] = entry as [DeepKey<Model>, string];
      const element = document.getElementById(`${key}-error`);
      if (element) {
        element.textContent = error ? error : '';
      }
    });
  }
  const errorElement = document.getElementById('errors');
  if (errorElement) {
    console.log(errors);
    errorElement.textContent = JSON.stringify(
      errors,
      (_, value) => (value === undefined ? '__undefined' : value),
      2
    ).replace(/"__undefined"/g, 'undefined');
  }
  return errors;
};

export const onChange = <Model>(id: DeepKey<Model>, callback: (value: string) => void) => {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    element.oninput = event => {
      if (event.currentTarget && event.currentTarget instanceof HTMLInputElement) {
        callback(event.currentTarget.value);
      }
    };
    element.onblur = event => {
      if (event.currentTarget && event.currentTarget instanceof HTMLInputElement) {
        callback(event.currentTarget.value);
      }
    };
  }
};

export const onSubmit = (callback: () => void) => {
  const element = document.getElementById('form');
  if (element) {
    element.onsubmit = e => {
      e.preventDefault();
      callback();
    };
  }
};

export const onReset = (callback: () => void) => {
  const element = document.getElementById('reset-button');
  if (element) {
    element.onclick = () => {
      callback();
    };
  }
};

export const addProduct = (index: number) => {
  const productListElement = document.getElementById('products')!;
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
`;
  const div = document.createElement('div');
  div.id = `products[${index}]`;
  div.className = 'row';
  div.innerHTML = productElement;

  productListElement.appendChild(div);
};

export const removeProduct = (products: [], index: number, onAddHandlers: (i: number) => void) => {
  const productElement = document.getElementById(`products[${index}]`)!;
  productElement.remove();

  products.forEach((_, i) => {
    if (i >= index) {
      const oldIndex = i + 1;
      const container = document.getElementById(`products[${oldIndex}]`)!;
      container.id = `products[${i}]`;
      const removeButton = document.getElementById(`products[${oldIndex}]-remove-button`)!;
      removeButton.id = `products[${i}]-remove-button`;
      const name = document.getElementById(`products[${oldIndex}].name`)!;
      name.id = `products[${i}].name`;
      const nameError = document.getElementById(`products[${oldIndex}].name-error`)!;
      nameError.id = `products[${i}].name-error`;
      const quantity = document.getElementById(`products[${oldIndex}].quantity`)!;
      quantity.id = `products[${i}].quantity`;
      const quantityError = document.getElementById(`products[${oldIndex}].quantity-error`)!;
      quantityError.id = `products[${i}].quantity-error`;

      onAddHandlers(i);
    }
  });
};
