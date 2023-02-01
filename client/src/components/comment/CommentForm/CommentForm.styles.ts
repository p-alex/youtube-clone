import styled from 'styled-components';

export const CommentFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: var(--space-medium);
`;

export const CommentFormProfilePicture = styled.div`
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
  gap: var(--space-small);
  float: right;
`;
