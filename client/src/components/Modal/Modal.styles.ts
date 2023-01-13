import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const Modal__Wrapper = styled.div<{ width: number }>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: var(--modal-layer);
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${(props) => props.width}px) {
    align-items: flex-start;
    justify-content: center;
  }
`;

export const Modal__Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: calc(var(--modal-layer) + 1);
  background-color: var(--backdrop-bg);
`;

export const Modal__Container = styled.div<{ width: number }>`
  position: relative;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.theme.uiBg};
  border: solid 1px ${(props) => props.theme.borderColor};
  z-index: calc(var(--modal-layer) + 2);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  color: ${(props) => props.theme.textColor};
  max-height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${(props) => props.width}px) {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: none;
    max-height: none;
  }
`;

export const Modal__Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  padding: 20px;
  z-index: calc(var(--modal-layer) + 3);
  background-color: ${(props) => props.theme.uiBg};
`;

export const Modal__Title = styled.h1`
  text-transform: capitalize;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 1.3rem;
`;

export const Modal__CloseBtn = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  right: -5px;
`;

export const Modal__Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: auto;
`;
