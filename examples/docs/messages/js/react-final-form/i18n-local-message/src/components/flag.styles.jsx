import styled from 'styled-components';

export const Flag = styled.img`
  cursor: pointer;
  border-radius: 50%;
  border: ${({ selected }) => (selected ? '1px solid #1976d2' : '')};

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;
