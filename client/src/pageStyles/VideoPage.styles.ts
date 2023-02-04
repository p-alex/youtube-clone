import styled from 'styled-components';
import { MOBILE_BREAK_POINT } from '../layout/style';

export const VideoPageContainer = styled.main`
  position: relative;
  display: flex;
  gap: var(--space-big);
  max-width: 1750px;
  margin: auto;
  padding: 0 var(--space-big);
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
  gap: var(--space-big);
`;

export const VideoDetailsContainer = styled.div`
  position: relative;
  width: 100%;
`;
