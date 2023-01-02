import styled from 'styled-components';

export const BigLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

export const CustomLogo = styled.div`
  width: 35px;
  height: 25px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  & svg {
    width: 20px;
    color: ${(props) => props.theme.uiBg};
  }
`;
