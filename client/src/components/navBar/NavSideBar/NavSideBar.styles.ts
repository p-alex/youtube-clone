import styled from 'styled-components';
import { NAV_BAR_HEIGHT } from '../../../layout/style';

export const NavSideBar__Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const NavSideBar__Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-bg);
  z-index: 101;
`;

export const NavSideBar__Container = styled.aside`
  position: absolute;
  width: 250px;
  background-color: ${(props) => props.theme.uiBg};
  color: ${(props) => props.theme.textColor};
  z-index: 102;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const NavSideBar__ButtonsContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100%);
  margin-bottom: var(--space-medium);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NavSideBar__Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-big);
  height: ${NAV_BAR_HEIGHT}px;
  padding: var(--space-big);
`;

export const NavSideBar__CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

export const NavSideBar__HorizontalLine = styled.hr`
  background-color: ${(props) => props.theme.hrColor};
  border: none;
  height: 1px;
  width: 90%;
`;

export const NavSideBar__ButtonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  margin-top: var(--space-medium);
`;

export const NavSideBar__ListTitle = styled.p`
  padding: var(--space-medium);
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  margin-bottom: var(--space-small);
`;

export const NavSideBar__ButtonItem = styled.li``;

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
