import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
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
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
  gap: 20px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  font-size: 1rem;
  & span {
    color: ${(props) => props.theme.textMutedColor};
  }
`;
