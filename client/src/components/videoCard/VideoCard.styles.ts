import styled from 'styled-components';

export const VideoCard__Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

export const VideoCard__ThumbnailContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  display: flex;
`;

export const VideoCard__Thumbnail = styled.img`
  width: 100%;
  background-color: ${(props) => props.theme.textMutedColor};
  height: 0;
  padding-bottom: 56.25%;
  cursor: pointer;
`;

export const VideoCard__Body = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const VideoCard__ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const VideoCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${(props) => props.theme.textMutedColor};
`;

export const VideoCard__Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 25px;
  font-weight: 500;
`;

export const VideoCard__Username = styled.p``;

export const VideoCard__Stats = styled.p``;
