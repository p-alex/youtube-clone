import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../../layout/style';

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
  background-color: var(--backdrop-bg);
  z-index: 101;
`;

export const NavSideBar_Container = styled.aside`
  position: absolute;
  width: 250px;
  background-color: ${(props) => props.theme.uiBg};
  color: ${(props) => props.theme.textColor};
  z-index: 102;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NavSideBar_Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-big);
  height: ${NAV_BAR_HEIGHT}px;
  padding: var(--space-big);
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
`;

export const NavSideBar_ButtonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  margin-top: var(--space-big);
`;

export const NavSideBar_ButtonItem = styled.li``;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-medium);
  width: 100%;
  padding: var(--space-big);
`;

export const LoginTitle = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: var(--space-small);
`;
