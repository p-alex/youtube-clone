import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

export const Input = styled.input`
  display: block;
  border: solid red 1px;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px 16px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 20px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;
