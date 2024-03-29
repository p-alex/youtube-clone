import styled from 'styled-components';

export const UploadVideoStage__UploadingContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const UploadVideoStage__Status = styled.h3`
  color: ${(props) => props.theme.textColor};
`;

export const UploadVideoStage__Progress = styled.p`
  color: ${(props) => props.theme.textColor};
`;
