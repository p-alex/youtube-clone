import styled from 'styled-components';

export const NavContainer = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 10px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.uiBg};
  padding: 10px 20px;
`;

export const NavToggleAndLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavToggleSideBar = styled.button`
  color: ${(props) => props.theme.textColor};
`;

export const NavSearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
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

export const NavAddVideoBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavProfileBtn = styled.button`
  width: 32;
  height: 32;
  & img {
    border-radius: 50%;
  }
`;
