import { css } from 'emotion';
import { colors } from './colors';

export const typography = {
  h1: css`
    font-size: 3rem;
    font-weight: 700;
    color: ${colors.dark};
  `,
  h2: css`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${colors.dark};
  `,
  body: css`
    font-size: 1.5rem;
    font-weight: 400;
    color: ${colors.dark};
  `,
  field: css`
    font-size: 1rem;
    font-weight: 300;
    color: ${colors.dark};
  `,
  button: css`
    font-size: 1.3rem;
    font-weight: 400;
    color: ${colors.white};
  `,
};
