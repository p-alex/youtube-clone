import styled from 'styled-components';

export const VideoCardWithInfoContainer = styled.article`
  position: relative;
  margin-bottom: 15px;
  display: flex;
`;

export const VideoCardWithInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
`;

export const VideoCardWithInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const VideoCardWithInfoTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const VideoCardWithInfoViewsAndUsername = styled.small`
  color: ${(props) => props.theme.textMutedColor};
  display: flex;
  align-items: center;
  & img {
    border-radius: 50%;
  }
`;

export const VideoCardWithInfoDescription = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: ${(props) => props.theme.textMutedColor};
`;
