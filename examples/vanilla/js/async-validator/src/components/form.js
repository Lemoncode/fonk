import * as classes from './form.styles';

export const Form = props => {
  const { onSubmit, children = [] } = props;

  const formElement = document.createElement('form');

  formElement.onsubmit = e => {
    e.preventDefault();
    onSubmit();
  };
  children.forEach(child => {
    formElement.appendChild(child);
  });
  formElement.className = classes.container;

  return formElement;
};
