import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
`;

export const Duration = styled.p`
  position: absolute;
  bottom: 10px;
  right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-size: 0.85rem;
`;

export const Thumbnail = styled.img`
  width: 100%;
  background-color: ${(props) => props.theme.textMutedColor};
  height: 0;
  padding-bottom: 56.25%;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 10px 0;
  @media (max-width: 550px) {
    padding: 10px 20px;
  }
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textMutedColor};
`;

export const Title = styled.p`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const Username = styled.p``;

export const Stats = styled.p``;
