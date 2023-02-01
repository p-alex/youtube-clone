import styled from 'styled-components';

export const MobileVideoTimeline__Container = styled.div<{ canInteract: boolean }>`
  position: absolute;
  bottom: 25px;
  padding: var(--space-small) var(--space-medium);
  transform: translateY(50%);
  width: 100%;
  height: 18px;
  z-index: ${(props) => (props.canInteract ? '3' : '0')};
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export const MobileVideoTimeline__Timeline = styled.div`
  background-color: rgba(100, 100, 100);
  width: 100%;
  height: 4px;
`;

export const MobileVideoTimeline__ProgressBar = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MobileVideoTimeline__ProgressBarCircle = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  transform: translateX(50%);
  border-radius: 50%;
  background-color: ${(props) => props.theme.accentColor};
`;
