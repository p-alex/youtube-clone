import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  gap: 20px;
  margin-bottom: 10px;
`;

export const CommentsCountParagraph = styled.p`
  color: ${(props) => props.theme.textColor};
`;

export const SortBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 10px;
  color: ${(props) => props.theme.textColor};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const AddCommentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  position: relative;
  display: block;
  width: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.inputBg};
  padding: 10px;
  resize: vertical;
  font-size: 1rem;
  min-height: 120px;
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

export const CommentsList = styled.div``;
