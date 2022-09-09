import styled from 'styled-components';
import { MOBILE_BREAK_POINT } from '../../layout/style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 501;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.inputBg};
  border: dashed 3px ${(props) => props.theme.borderColor};
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const FormContainer = styled.form`
  position: relative;
  overflow: none;
  top: 20px;
  max-width: 800px;
  margin: auto;
  z-index: 502;
  padding: 20px;
  background-color: ${(props) => props.theme.uiBg};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    top: 0px;
    margin: 0;
    height: calc(100vh);
    overflow-y: scroll;
  }
`;

export const CloseBtn = styled.button`
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  width: 35px;
  height: 35px;
  margin-bottom: 10px;
  color: white;
`;

export const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const InputError = styled.p`
  color: red;
  margin-top: 5px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Tag = styled.p`
  background-color: ${(props) => props.theme.btnBg};
  color: ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
`;

export const ResultMessage = styled.p<{ isSuccess: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.isSuccess ? '#95C623' : 'red')};
  margin-top: 20px;
`;
