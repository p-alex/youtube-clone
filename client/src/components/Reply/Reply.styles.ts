import styled from 'styled-components';

export const ReplyContainer = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 25px;
  border-radius: 5px;
  gap: 15px;
  width: 100%;
`;

export const ReplyProfilePicture = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  & img {
    border-radius: 50%;
  }
`;

export const ReplyBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const ReplyUsernameAndDate = styled.div``;

export const ReplyUsername = styled.div`
  & a {
    color: ${(props) => props.theme.textColor};
  }
`;

export const ReplyText = styled.p`
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 20px;
`;

export const ReplyDate = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const ReplyButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyButton = styled.button`
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

export const ReplyFormContainer = styled.div`
  margin-top: 10px;
`;
