import { typography } from './theme';

export const Typography = props => {
  const { label, variant = 'h1' } = props;
  const typographyElement = document.createElement(variant);
  typographyElement.textContent = label;
  typographyElement.className = typography['variant'];

  return typographyElement;
};
