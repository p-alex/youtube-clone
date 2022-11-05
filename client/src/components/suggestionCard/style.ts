import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  max-width: 550px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin-bottom: 20px;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 180px;
  height: 101px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: 100%;
    height: auto;
  }
`;

export const Thumbnail = styled.img`
  display: block;
  width: 100%;
  background-color: ${(props) => props.theme.textMutedColor};
  height: 0;
  padding-bottom: 56.25%;
  cursor: pointer;
  min-width: 180px;
  min-height: 101px;
`;

export const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textMutedColor};
  padding: 5px 0;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0;
  }
  @media (max-width: 577px) {
    padding: 5px ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  width: 180px;
`;

export const Username = styled.p`
  font-size: 0.8rem;
`;

export const Stats = styled.p`
  font-size: 0.8rem;
`;
