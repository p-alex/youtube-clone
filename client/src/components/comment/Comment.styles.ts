import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const CommentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: var(--space-medium);
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
  gap: var(--space-small);
  width: 100%;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-small);
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
  font-size: 0.85rem;
  position: relative;
  width: max-content;
  margin: var(--space-small) 0;
`;

export const CommentDate = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const CommentButtons = styled.div`
  display: flex;
  gap: var(--space-small);
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  background-color: ${(props) => props.theme.normalBtn.bg};
  padding: calc(var(--space-small) / 2) calc(var(--space-medium) / 2);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  font-size: 0.85rem;
  font-weight: 700;
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
