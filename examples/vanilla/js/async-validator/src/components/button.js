import * as classes from './button.styles';

export const Button = props => {
  const { label, onClick, type = 'button' } = props;

  const buttonElement = document.createElement('button');
  buttonElement.textContent = label;
  buttonElement.onclick = () => {
    if (onClick) {
      onClick();
    }
  };

  buttonElement.type = type;
  buttonElement.className = classes.container;

  return buttonElement;
};
