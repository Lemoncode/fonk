import { css } from 'emotion';
import { colors, typography } from './theme';

export const container = css`
  ${typography.button};
  align-self: flex-end;
  background-color: ${colors.primary};
  color: ${colors.white};
  white-space: nowrap;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  border: 1px solid ${colors.light};
  cursor: pointer;
  outline: none;

  &:visited {
    color: ${colors.white};
  }

  &:hover {
    background-color: ${colors.white};
    color: ${colors.primary};
    border-color: ${colors.primary};
  }

  &:active {
  box-shadow: 0 0 5px rgba(33, 33, 33, 0.2);
  }
`;
