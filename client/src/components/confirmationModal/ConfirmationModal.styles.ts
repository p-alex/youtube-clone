import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const ConfirmationModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmationModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-bg);
  z-index: 101;
`;

export const ConfirmationModalContainer = styled.div`
  position: relative;
  max-width: 500px;
  background-color: ${(props) => props.theme.uiBg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 102;
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;

export const ConfirmationModalTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
`;

export const ConfirmationModalMessage = styled.p`
  color: ${(props) => props.theme.textMutedColor};
`;

export const ConfirmationModalButtons = styled.div`
  display: flex;
  gap: 20px;
  width: max-content;
  float: right;
`;
