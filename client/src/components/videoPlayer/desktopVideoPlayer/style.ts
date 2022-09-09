import styled from 'styled-components';

export const VideoContainer = styled.div<{ showCursor: boolean; isTheatreMode: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  cursor: ${(props) => (props.showCursor ? 'initial' : 'none')};
  user-select: none;
  background-color: black;
  @media (min-width: 1620px) {
    height: ${(props) => (props.isTheatreMode ? '100vh' : 'auto')};
    max-height: ${(props) => (props.isTheatreMode ? '82vh' : 'auto')};
  }
  @media (min-width: 2560px) {
    height: auto;
    max-height: none;
  }
`;

export const Video = styled.video<{ isTheatreMode: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
`;
