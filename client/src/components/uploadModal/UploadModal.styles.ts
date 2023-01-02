import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const UploadModal__Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const UploadModal__Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-bg);
  top: 0;
  left: 0;
  z-index: 201;
`;

export const UploadModal__Modal = styled.div`
  position: relative;
  width: 800px;
  height: 95vh;
  max-height: 600px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.uiBg};
  z-index: 202;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UploadModal__Header = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  padding: 20px;
`;

export const UploadModal__Title = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const UploadModal__CloseBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
