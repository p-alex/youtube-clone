import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const Reply__Container = styled.div`
  position: relative;
  display: flex;
  margin-bottom: var(--space-big);
  gap: var(--space-medium);
  width: 100%;
`;

export const Reply__ProfilePicture = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  & img {
    border-radius: 50%;
  }
`;

export const Reply__Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  width: 100%;
`;

export const Reply__Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-small);
  width: 100%;
`;

export const Reply__UsernameAndDate = styled.div``;

export const Reply__Username = styled.div`
  & a {
    color: ${(props) => props.theme.textColor};
  }
`;

export const Reply__Text = styled.p<{ showMoreText: boolean | null }>`
  color: ${(props) => props.theme.textColor};
  white-space: pre-line;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) =>
    props.showMoreText === true ? '0' : props.showMoreText === false ? '4' : '0'};
  overflow: hidden;
  & a {
    color: ${(props) => props.theme.accentColor};
    margin-right: 5px;
  }
`;

export const Reply__Date = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const Reply__Buttons = styled.div`
  display: flex;
  gap: var(--space-small);
`;

export const Reply__Button = styled.button`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  color: ${(props) => props.theme.textColor};
  text-transform: uppercase;
  font-size: 1rem;
  background-color: ${(props) => props.theme.normalBtn.bg};
  padding: calc(var(--space-small) / 2) calc(var(--space-small));
  border-radius: ${BORDER_RADIUS_ROUND}px;
  font-size: 0.85rem;
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

export const Reply__FormContainer = styled.div`
  margin-top: var(--space-medium);
`;
