import styled from 'styled-components';
import {
  CONTAINER_HORIZONTAL_PADDING,
  NAV_BAR_HEIGHT,
  NAV_MOBILE_BREAK_POINT,
} from '../../layout/style';

export const NavBar__Container = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: ${NAV_BAR_HEIGHT}px;
  background-color: ${(props) => props.theme.uiBg};
  z-index: 80;
  padding: 10px ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    justify-content: space-between;
  }
`;

export const NavBar__ToggleAndLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavBar__ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

export const NavBar__SearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
  display: flex;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    display: none;
  }
`;

export const NavBar__Search = styled.input`
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 70%;
  max-width: 600px;
`;

export const NavBar__BtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavBar__MobileSearchBtn = styled.button`
  display: none;
  color: ${(props) => props.theme.textColor};
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const NavBar__AddVideoBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavBar__ProfileBtn = styled.button`
  width: 32px;
  height: 32px;
  & img {
    border-radius: 50%;
  }
`;

export const NavBar__MobileSearchContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
