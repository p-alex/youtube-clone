import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, MOBILE_BREAK_POINT } from '../../layout/style';

export const EditVideoModal__Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
`;

export const EditVideoModal__Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-bg);
  z-index: 501;
`;

export const EditVideoModal__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const EditVideoModal__HiddenInput = styled.input`
  display: none;
`;

export const EditVideoModal__FormContainer = styled.form`
  position: relative;
  max-width: 900px;
  max-height: calc(95vh - 40px);
  margin: 40px auto 0 auto;
  z-index: 502;
  padding: 20px;
  overflow-y: scroll;
  border: solid 1px ${(props) => props.theme.borderColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${(props) => props.theme.uiBg};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    top: 0px;
    margin: 0 auto;
    height: 100vh;
    max-height: none;
  }
`;

export const EditVideoModal__CloseBtn = styled.button`
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`;

export const EditVideoModal__InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const EditVideoModal__InputError = styled.p`
  color: red;
  margin-top: 5px;
`;

export const EditVideoModal__TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const EditVideoModal__Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
`;

export const EditVideoModal__ResultMessage = styled.p<{ isSuccess: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.isSuccess ? '#95C623' : 'red')};
  margin-top: 20px;
`;
