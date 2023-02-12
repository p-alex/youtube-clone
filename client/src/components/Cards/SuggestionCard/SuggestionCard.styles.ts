import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../../layout/style';

export const SuggestionCard__Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: var(--space-small);
  max-width: 550px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin-bottom: var(--space-big);
  }
`;

export const SuggestionCard__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  transition: filter 150ms ease-in-out;
  ${SuggestionCard__Container}:hover & {
    filter: brightness(1.1);
  }
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 100%;
    height: auto;
  }
`;

export const SuggestionCard__Body = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: var(--space-medium);
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
  }
`;

export const SuggestionCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textMutedColor};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 577px) {
    /* padding: 5px ${CONTAINER_HORIZONTAL_PADDING}px; */
  }
`;

export const SuggestionCard__Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin-bottom: var(--space-small);
  cursor: pointer;
  width: 180px;
  font-size: 1.2rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const SuggestionCard__Username = styled.a`
  font-size: 0.85rem;
`;

export const SuggestionCard__Stats = styled.p`
  font-size: 0.85rem;
`;
