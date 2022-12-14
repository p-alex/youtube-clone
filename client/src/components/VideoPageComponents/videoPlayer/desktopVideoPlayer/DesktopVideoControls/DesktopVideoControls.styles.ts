import styled from 'styled-components';

export const DesktopVideoControls__Container = styled.div<{ showControls: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 10px;
  padding: 10px;
  opacity: ${(props) => (props.showControls ? '1' : '0')};
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 1;
    cursor: initial;
  }
`;

export const DesktopVideoControls__Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: white;
  font-size: 1.8rem;
`;

export const DesktopVideoControls__VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DesktopVideoControls__VolumeSlider = styled.input`
  width: 0px;
  opacity: 0;
  -webkit-appearance: none !important;
  height: 4px;
  background-color: rgb(150, 150, 150);
  border-radius: 500px;
  transition: width 200ms ease-in-out, opacity 200ms ease-in-out;
  ${DesktopVideoControls__VolumeContainer}:hover & {
    width: 60px;
    opacity: 1;
    margin-left: 10px;
  }
  ${DesktopVideoControls__VolumeContainer}:focus-within {
    width: 60px;
    opacity: 1;
    margin-left: 10px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    position: relative;
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
  }
`;

export const DesktopVideoControls__DurationContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  color: white;
  font-size: 0.8rem;
`;

export const DesktopVideoControls__TheatreIcon = styled.div`
  width: 90%;
  height: 50%;
  border: solid white 2.5px;
  &.active {
    width: 75%;
    height: 42%;
  }
`;
