import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadingContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Status = styled.h3`
  color: ${(props) => props.theme.textColor};
`;

export const Progress = styled.p`
  color: ${(props) => props.theme.textColor};
`;
