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
