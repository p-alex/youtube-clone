import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
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
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${(props) => props.theme.textMutedColor};
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  cursor: pointer;
`;

export const Username = styled.p``;

export const Stats = styled.p``;
