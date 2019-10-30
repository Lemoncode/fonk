import * as classes from './input.styles';

export const Input = props => {
  const { value, onChange, label } = props;

  const containerElement = document.createElement('div');
  containerElement.className = classes.container;

  let labelElement;
  if (label) {
    labelElement = document.createElement('label');
    labelElement.textContent = label;
    labelElement.className = classes.label;
    containerElement.appendChild(labelElement);
  }

  const inputElement = document.createElement('input');
  inputElement.value = value;
  inputElement.onchange = onChange;
  inputElement.className = classes.input;
  containerElement.appendChild(inputElement);

  return containerElement;
};
