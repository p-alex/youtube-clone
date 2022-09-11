import styled from "styled-components";
import {
  CONTAINER_HORIZONTAL_PADDING,
  NAV_BAR_HEIGHT,
} from "../../layout/style";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  /* top: calc(56.25vw + ${NAV_BAR_HEIGHT}px); */
  height: 75vh;
  background-color: ${(props) => props.theme.uiBg};
  z-index: 200;
  overflow-y: scroll;
`;

export const Header = styled.div`
  width: 100%;
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Handle = styled.div`
  width: 100px;
  height: 4px;
  border-radius: 500px;
  background-color: ${(props) => props.theme.textMutedColor};
  margin-bottom: 5px;
  margin-top: 7px;
`;

export const TitleAndClose = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px ${CONTAINER_HORIZONTAL_PADDING}px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`;

export const Title = styled.h3``;

export const CloseBtn = styled.button`
  color: ${(props) => props.theme.textColor};
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 0 20px;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
  & textarea:focus button {
    display: block;
  }
`;

export const FormInput = styled.textarea`
  position: relative;
  display: block;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 10px;
  resize: vertical;
  font-size: 1rem;
  min-height: 100px;
`;

export const CommentBtn = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 2px;
  padding: 10px 16px;
  color: #243302;
  text-transform: uppercase;
  &:disabled {
    background-color: ${(props) => props.theme.btnBg};
    color: white;
    opacity: 0.7;
  }
`;

export const Comments = styled.div`
  position: relative;
  padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  width: 100%;
`;
