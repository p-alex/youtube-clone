import styled from 'styled-components';

export const VideoCardWithInfo_Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const VideoCardWithInfo__ThumbnailContainer = styled.div`
  position: relative;
  width: 350px;
  aspect-ratio: 600 / 352;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const VideoCardWithInfo__Duration = styled.p`
  position: absolute;
  bottom: 10px;
  right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 0.85rem;
`;

export const VideoCardWithInfo__Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0 20px;
  }
`;

export const VideoCardWithInfo__Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const VideoCardWithInfo__ViewsAndDate = styled.small`
  color: ${(props) => props.theme.textMutedColor};
  word-break: normal;
`;

export const VideoCardWithInfo__UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export const VideoCardWithInfo__Username = styled.p`
  color: ${(props) => props.theme.textMutedColor};
  width: max-content;
  & a {
    color: ${(props) => props.theme.textMutedColor};
    font-size: 0.85rem;
  }
`;

export const VideoCardWithInfo__Description = styled.p`
  color: ${(props) => props.theme.textMutedColor};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 0.85rem;
  @media (max-width: 600px) {
    display: none;
  }
`;
