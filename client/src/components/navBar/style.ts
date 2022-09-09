import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, NAV_MOBILE_BREAK_POINT } from '../../layout/style';

export const NavContainer = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background-color: ${(props) => props.theme.uiBg};
  z-index: 80;
  padding: 10px ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    justify-content: space-between;
  }
`;

export const NavToggleAndLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavToggleSideBar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

export const NavSearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
  display: flex;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    display: none;
  }
`;

export const NavSearch = styled.input`
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 70%;
  max-width: 600px;
`;

export const NavSearchBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  background-color: ${(props) => props.theme.btnBg};
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.btnHoverBg};
  }
`;

export const NavBtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const NavMobileSearchBtn = styled.button`
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

export const NavAddVideoBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavProfileBtn = styled.button`
  width: 32px;
  height: 32px;
  & img {
    border-radius: 50%;
  }
`;

export const LoginInBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
  color: ${(props) => props.theme.accentColor};
  border: solid 2px ${(props) => props.theme.accentColor};
  text-transform: uppercase;
  font-weight: bold;
`;
