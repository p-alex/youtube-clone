import styled from 'styled-components';

export const ListButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-medium);
  padding: 10px var(--space-medium);
  color: ${(props) => props.theme.textColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.listButton.bgHover};
  }
`;
