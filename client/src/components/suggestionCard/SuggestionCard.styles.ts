import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const SuggestionCard__Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  max-width: 550px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin-bottom: 20px;
  }
`;

export const SuggestionCard__ThumbnailContainer = styled.div`
  position: relative;
  width: 180px;
  height: 101px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 100%;
    height: auto;
  }
`;

export const SuggestionCard__Duration = styled.p`
  position: absolute;
  bottom: 3px;
  right: 3px;
  font-size: 0.9rem;
  padding: 3px 5px;
  border-radius: 5px;
  color: white;
  background-color: black;
`;

export const SuggestionCard__Thumbnail = styled.img`
  display: block;
  width: 100%;
  background-color: ${(props) => props.theme.textMutedColor};
  height: 0;
  padding-bottom: 56.25%;
  cursor: pointer;
  min-width: 180px;
  min-height: 101px;
`;

export const SuggestionCard__Body = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
  }
`;

export const SuggestionCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textMutedColor};
  padding: 5px 0;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 577px) {
    padding: 5px ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;

export const SuggestionCard__Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  cursor: pointer;
  width: 180px;
  font-size: 1rem;
  line-height: 22px;
  font-weight: 500;
`;

export const SuggestionCard__Username = styled.p`
  font-size: 0.8rem;
`;

export const SuggestionCard__Stats = styled.p`
  font-size: 0.8rem;
`;
