import styled from 'styled-components';

export const VideoCard__Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

export const VideoCard__ThumbnailContainer = styled.div`
  position: relative;
`;

export const VideoCard__Duration = styled.p`
  position: absolute;
  bottom: 10px;
  right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 0.85rem;
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
  gap: 15px;
  padding: 10px 0;
  @media (max-width: 550px) {
    padding: 10px 20px;
  }
`;

export const VideoCard__ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const VideoCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textMutedColor};
`;

export const VideoCard__Title = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 1.2rem;
  line-height: 25px;
  font-weight: 500;
`;

export const VideoCard__Username = styled.p``;

export const VideoCard__Stats = styled.p``;
