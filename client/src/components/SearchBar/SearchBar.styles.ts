import styled from 'styled-components';
import { BORDER_RADIUS_ROUNDER, NAV_MOBILE_BREAK_POINT } from '../../layout/style';

export const SearchForm = styled.form<{ isMobile: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    display: ${(props) => (props.isMobile ? 'flex' : 'none')};
  }
`;

export const Search = styled.input`
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px 20px;
  font-size: 1rem;
  width: 70%;
  max-width: 600px;
  border-top-left-radius: ${BORDER_RADIUS_ROUNDER}px;
  border-bottom-left-radius: ${BORDER_RADIUS_ROUNDER}px;
  outline: none;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    width: 100%;
  }
`;

export const SearchBtn = styled.button`
  border-top-right-radius: ${BORDER_RADIUS_ROUNDER}px;
  border-bottom-right-radius: ${BORDER_RADIUS_ROUNDER}px;
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.normalBtn.bg};
  border-top: solid 1px ${(props) => props.theme.borderColor};
  border-right: solid 1px ${(props) => props.theme.borderColor};
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;
