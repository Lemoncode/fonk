import { css } from 'emotion';
import { colors, typography } from './theme';

export const container = css`
  display: flex;
  align-items: center;
`;

export const label = css`
  flex-grow: 1;
  ${typography.body};
`;

export const input = css`
  ${typography.field};
  flex-grow: 2;
  flex-basis: auto;
  padding: 0.5rem 1rem;
  margin-left: 15px;
  border: 1px solid ${colors.primary};
  border-radius: 6px;
  background-color: ${colors.light};
  outline: none;
  &:focus {
    border-color: ${colors.dark};
  }
`;
