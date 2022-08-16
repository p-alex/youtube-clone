import styled from 'styled-components';

export const BigLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
  & svg {
    font-size: 2.1rem;
    color: #fe0001;
  }
`;
