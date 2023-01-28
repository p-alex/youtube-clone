import styled from 'styled-components';

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
`;
