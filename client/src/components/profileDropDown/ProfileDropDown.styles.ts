import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, NAV_BAR_HEIGHT } from '../../layout/style';

export const ProfileDropDown__Container = styled.div`
  position: absolute;
  top: calc(${NAV_BAR_HEIGHT}px);
  right: 0px;
  width: 250px;
  background-color: ${(props) => props.theme.uiBg};
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  overflow: hidden;
`;

export const ProfileDropDown__Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-medium);
  padding: var(--space-medium) var(--space-medium);
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  a {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const ProfileDropDown__ProfilePicture = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileDropDown__Username = styled.h3`
  text-align: left;
  color: ${(props) => props.theme.textColor};
`;

export const ProfileDropDown__NameAndManage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileDropDown__ButtonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
  padding: var(--space-small) 0;
`;

export const ProfileDropDown__ButtonItem = styled.li``;
