import styled from 'styled-components';
import { NAV_BAR_HEIGHT, NAV_MOBILE_BREAK_POINT } from '../../../layout/style';

export const MobileSearchBar__Container = styled.div`
  position: absolute;
  width: 100%;
  padding: 0 var(--space-big);
  z-index: 100;
  height: ${NAV_BAR_HEIGHT}px;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.uiBg};
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-medium);
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    display: flex;
  }
`;

export const MobileSearchBar__CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  position: relative;
  left: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;
