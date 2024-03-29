import styled from 'styled-components';

export const MobileVideoControls__Container = styled.div<{ showControls: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 200ms ease-in-out;
  opacity: ${(props) => (props.showControls ? '1' : '0')};
`;

export const MobileVideoControls__BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const MobileVideoControls__PlayAndSkipControls = styled.div<{
  disableClick: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
  display: flex;
  gap: var(--space-large);
  width: max-content;
  z-index: ${(props) => (props.disableClick ? '0' : '2')};
`;

export const MobileVideoControls__BigControls = styled.button`
  width: 30px;
  height: 30px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  &:nth-child(2) svg {
    transform: scale(1.4);
  }
  & svg {
    font-size: 2rem;
  }
`;

export const MobileVideoControls__BottomContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 35px;
  padding: var(--space-small) var(--space-medium);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

export const MobileVideoControls__Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  color: #ffffff;
  transform: translateX(7px);
  & svg {
    font-size: 1.4rem;
  }
`;

export const MobileVideoControls__Duration = styled.p`
  color: #fff;
  font-size: 0.85rem;
`;
