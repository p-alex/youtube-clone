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
