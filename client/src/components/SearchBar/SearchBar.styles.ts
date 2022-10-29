import styled from 'styled-components';
import { NAV_MOBILE_BREAK_POINT } from '../../layout/style';

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
  display: flex;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    display: none;
  }
`;

export const Search = styled.input`
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 70%;
  max-width: 600px;
`;
