import styled from 'styled-components';

export const VideoCard = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.uiBg};
  padding: 10px;
`;

export const VideoImage = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

export const VideoDuration = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  background-color: black;
  color: white;
  border-radius: 5px;
`;

export const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const VideoTitle = styled.h3`
  color: ${(props) => props.theme.textColor};
`;

export const VideoDetailItems = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const VideoDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.btnBg};
  color: ${(props) => props.theme.textColor};
  svg {
    font-size: 1.2rem;
  }
`;
