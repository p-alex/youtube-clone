import styled from "styled-components";

export const ConfirmDelete = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1001;
`;

export const ConfirmContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1002;
  background-color: ${(props) => props.theme.uiBg};
  padding: 20px;
  border-radius: 5px;
`;

export const Message = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
  max-width: 250px;
  text-align: center;
`;

export const ConfirmButtons = styled.div`
  display: flex;
  gap: 20px;
`;
