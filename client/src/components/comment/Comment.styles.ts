import styled from 'styled-components';

export const CommentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  gap: 15px;
  width: 100%;
`;

export const CommentProfilePicture = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  & img {
    border-radius: 50%;
  }
`;

export const CommentBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const CommentUsernameAndDate = styled.div``;

export const CommentUsername = styled.div`
  & a {
    color: ${(props) => props.theme.textColor};
  }
`;

export const CommentText = styled.p<{ showMoreText: boolean | null }>`
  position: relative;
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 20px;
  height: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) =>
    props.showMoreText === true ? '0' : props.showMoreText === false ? '4' : '0'};
  overflow: hidden;
`;

export const ReadMoreToggleBtn = styled.button`
  color: ${(props) => props.theme.textMutedColor};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  position: relative;
  width: max-content;
  margin: 5px 0;
`;

export const CommentDate = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const CommentButtons = styled.div`
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
    font-size: 1rem;
  }
`;

export const CommentFormContainer = styled.div`
  margin-top: 10px;
`;
