import styled from "styled-components";
import {
  CONTAINER_HORIZONTAL_PADDING,
  NAV_BAR_HEIGHT,
  NAV_MOBILE_BREAK_POINT,
} from "../../layout/style";

export const Container = styled.div`
  display: none;
  @media (max-width: ${NAV_MOBILE_BREAK_POINT}px) {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: ${NAV_BAR_HEIGHT}px;
    display: flex;
    align-items: center;
    z-index: 200;
    background-color: ${(props) => props.theme.uiBg};
    color: ${(props) => props.theme.textColor};
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;

export const CloseSearchBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  width: 40px;
  margin-left: -10px;
  margin-right: 10px;
  height: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavMobileSearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const NavMobileSearch = styled.input`
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 8px;
  font-size: 1rem;
  width: 100%;
  max-width: 600px;
`;
