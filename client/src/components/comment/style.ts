import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
`;

export const ProfilePicture = styled.div`
  width: 40px;
  height: 40px;
  & img {
    border-radius: 50%;
  }
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormBody = styled.div``;

export const FormButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ManageButtonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex: 1;
`;

export const Username = styled.p`
  color: ${(props) => props.theme.textColor};
`;

export const CreatedAt = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const Text = styled.p`
  line-height: 20px;
`;

export const EditCommentForm = styled.form`
  position: relative;
  width: 100%;
`;

export const EditCommentButtons = styled.div`
  display: flex;
  gap: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  font-size: 1rem;
  background-color: ${(props) => props.theme.normalBtn.bg};
  padding: 3px 10px;
  border-radius: 500px;
  font-size: 0.8rem;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
  & span {
    color: ${(props) => props.theme.textMutedColor};
  }
  & svg {
    font-size: 1.2rem;
  }
`;
