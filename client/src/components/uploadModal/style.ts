import styled from 'styled-components';

export const Container = styled.div`
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

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 201;
`;

export const Modal = styled.div`
  position: relative;
  width: 800px;
  height: 85vh;
  max-height: 600px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.uiBg};
  z-index: 202;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  padding: 20px;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const CloseBtn = styled.button`
  color: ${(props) => props.theme.textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
