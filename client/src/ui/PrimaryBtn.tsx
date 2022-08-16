import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 2px;
  padding: 10px 16px;
  color: #111;
  text-transform: uppercase;
  font-weight: bold;
`;
