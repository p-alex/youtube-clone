import styled, { keyframes } from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../../layout/style';

export const DesktopVideoPlayer__Container = styled.div<{
  showCursor: boolean;
  isTheatreMode: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.isTheatreMode ? '100vh' : '100%')};
  max-height: ${(props) => (props.isTheatreMode ? '77vh' : 'none')};
  margin: auto;
  cursor: ${(props) => (props.showCursor ? 'initial' : 'none')};
  user-select: none;
  background-color: black;
  @media (min-width: 2560px) {
    height: auto;
    max-height: none;
  }
`;

export const DesktopVideoPlayer__Video = styled.video<{ isTheatreMode: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;;
  }
`;

export const DesktopVideoPlayer__TitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: var(--space-small) var(--space-medium);
  width: 100%;
  padding: var(--space-medium);
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 150ms ease-in-out;
`;

export const DesktopVideoPlayer__Title = styled.p`
  border-radius: ${BORDER_RADIUS_ROUND}px;
  color: white;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-width: 55%;
  font-size: 1.3rem;
  font-weight: 700;
  overflow: hidden;
`;
