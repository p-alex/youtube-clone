import styled from 'styled-components';

export const VideoPlayer__Container = styled.div<{ isTheatreMode: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${(props) => (props.isTheatreMode ? 'auto' : '16 / 9')};
`;
