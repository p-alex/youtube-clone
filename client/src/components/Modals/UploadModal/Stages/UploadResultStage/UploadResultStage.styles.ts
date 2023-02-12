import styled from 'styled-components';

export const UploadResultStage__ResultContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  & svg {
    font-size: 70px;
    color: ${(props) => props.theme.textColor};
  }
`;

export const UploadResultStage__Message = styled.h3`
  color: ${(props) => props.theme.textColor};
`;
