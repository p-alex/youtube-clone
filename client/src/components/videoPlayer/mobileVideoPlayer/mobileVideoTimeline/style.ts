import styled from 'styled-components';

export const Container = styled.div<{ canInteract: boolean }>`
  position: absolute;
  bottom: 25px;
  padding: 10px 20px;
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

export const Timeline = styled.div`
  background-color: rgba(100, 100, 100);
  width: 100%;
  height: 4px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: rgba(254, 44, 85, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ProgressBarCircle = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  transform: translateX(50%);
  border-radius: 50%;
  background-color: rgba(254, 44, 85, 1);
`;
