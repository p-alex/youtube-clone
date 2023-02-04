import styled from 'styled-components';

export const DesktopVideoTimeline__Timeline = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 100%;
  left: 0;
  height: 12px;
  bottom: 45px;
  opacity: 0.9;
  &.active {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
`;

export const DesktopVideoTimeline__Slider = styled.div`
  position: relative;
  height: 25%;
  width: 100%;
  background: rgb(100, 100, 100);
  transition: height 200ms ease-in-out;
  &.active {
    height: 100%;
  }
  ${DesktopVideoTimeline__Timeline}:hover & {
    height: 100%;
    cursor: pointer;
  }
`;

export const DesktopVideoTimeline__ProgressBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
  background-color: #ff0000;
  & p {
    color: black;
    font-size: 0.85rem;
    font-weight: bold;
    margin-right: 5px;
  }
`;

export const DesktopVideoTimeline__PreviewBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;
  background-color: rgb(150, 150, 150);
`;
