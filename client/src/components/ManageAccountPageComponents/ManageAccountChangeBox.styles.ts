import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, MOBILE_BREAK_POINT } from '../../layout/style';

export const ManageAccountChangeBox__Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px ${(props) => props.theme.borderColor};
  z-index: var(--modal-layer);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    align-items: flex-start;
  }
`;

export const ManageAccountChangeBox__Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--backdrop-bg);
  z-index: calc(var(--modal-layer) + 1);
`;

export const ManageAccountChangeBox__Container = styled.section`
  position: relative;
  width: 700px;
  padding: 20px;
  background-color: ${(props) => props.theme.uiBg};
  color: ${(props) => props.theme.textColor};
  animation: fadeIn 150ms;
  z-index: calc(var(--modal-layer) + 2);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  border: solid 1px ${(props) => props.theme.borderColor};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  @media (max-width: 740px) {
    width: 100%;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ManageAccountChangeBox__Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 15px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  margin-bottom: 30px;
`;

export const ManageAccountChangeBox__BackBtn = styled.button`
  color: ${(props) => props.theme.textMutedColor};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ManageAccountChangeBox__Title = styled.h1``;

export const ManageAccountChangeBox__FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
`;

export const ManageAccountForm = styled.form`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ManageAccountForm__ErrorMessage = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.errorColor};
  font-weight: 700;
  display: block;
  width: 100%;
`;

export const ManageAccountForm__ResultMessage = styled.p<{ isError: boolean }>`
  font-size: 0.85rem;
  color: ${(props) =>
    props.isError ? props.theme.errorColor : props.theme.textMutedColor};
  margin-bottom: 20px;
`;
