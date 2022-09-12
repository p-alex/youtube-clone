import styled from "styled-components";
import { CONTAINER_HORIZONTAL_PADDING } from "../../layout/style";

export const NavSideBar_Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const NavSideBar_Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
`;

export const NavSideBar_Container = styled.aside`
  position: absolute;
  width: 250px;
  background-color: ${(props) => props.theme.uiBg};
  color: ${(props) => props.theme.textColor};
  z-index: 102;
  height: 100%;
`;

export const NavSideBar_Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 17px ${CONTAINER_HORIZONTAL_PADDING}px;
`;

export const NavSideBar_CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

export const NavSideBar_HorizontalLine = styled.hr`
  background-color: ${(props) => props.theme.hrColor};
  border: none;
  height: 1px;
  width: 90%;
  margin: 10px 0;
`;

export const NavSideBar_ButtonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  margin-top: 20px;
`;

export const NavSideBar_ButtonItem = styled.li``;

export const LoginContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
`;

export const LoginTitle = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
`;
