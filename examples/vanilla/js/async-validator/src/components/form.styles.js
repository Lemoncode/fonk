import { css } from 'emotion';
import { colors } from './theme';

export const container = css`
  display: flex;
  flex-direction: column;

  & > :nth-child(n) {
    flex-grow: 1;
    margin: 1rem;
  }

  max-width: 500px;
  margin: 1rem auto;
  border: 1px solid #ccc;
  padding: 3rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background-color: ${colors.white};
`;
