import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING, MOBILE_BREAK_POINT } from '../../layout/style';

export const Container = styled.section`
  position: relative;
  width: 100%;
  max-width: 1850px;
  padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 0;
  }
`;

export const VideoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  list-style: none;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const VideoItem = styled.li``;
