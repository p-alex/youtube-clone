import styled from 'styled-components';

export const BigLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
  & svg {
    font-size: 2.1rem;
    color: #fe0001;
  }
`;

export const LogoBackDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  height: 20px;
`;
