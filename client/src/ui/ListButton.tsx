import styled from 'styled-components';

export const ListButton = styled.button`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.listButton.bgHover};
  }
`;

export const ListLink = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.listButton.bgHover};
  }
`;
