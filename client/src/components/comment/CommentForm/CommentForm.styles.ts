import styled from 'styled-components';

export const CommentFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const CommentFormProfilePicture = styled.div`
  min-width: 35px;
  width: 35px;
  height: 35px;
  margin-right: 15px;
  & img {
    border-radius: 50%;
  }
`;

export const CommentFormBody = styled.div`
  width: 100%;
`;

export const CommentFormButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  float: right;
  margin-top: 10px;
`;
