import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../layout/style';

export const VideoPageContainer = styled.main`
  position: relative;
  display: flex;
  gap: 20px;
  max-width: 1750px;
  margin: auto;
  padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0px;
    gap: 0px;
  }
`;

export const VideoColumn = styled.div`
  position: relative;
  width: 100%;
`;

export const VideoContainer = styled.div`
  position: relative;
  grid-area: video;
  z-index: 20;
`;

export const VideoDetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const VideoDetailsContainer = styled.div`
  position: relative;
  grid-area: video_details;
  width: 100%;
`;

export const SuggestionsColumn = styled.aside<{ isTheatreMode: boolean }>`
  width: 550px;
  grid-area: suggestions;
  margin-top: ${(props) => (props.isTheatreMode ? '20px' : '0')};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    margin: auto;
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;
