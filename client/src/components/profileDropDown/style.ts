import styled from "styled-components";
import { NAV_BAR_HEIGHT } from "../../layout/style";

export const Container = styled.div`
  position: absolute;
  top: calc(${NAV_BAR_HEIGHT}px);
  right: 0px;
  width: 250px;
  background-color: ${(props) => props.theme.uiBg};
  border: solid 1px ${(props) => props.theme.borderColor};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  a {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const ProfilePicture = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Username = styled.h3`
  text-align: left;
  color: ${(props) => props.theme.textColor};
`;

export const NameAndManage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ButtonList = styled.ul`
  position: relative;
  width: 100%;
  list-style: none;
`;

export const ButtonItem = styled.li``;
