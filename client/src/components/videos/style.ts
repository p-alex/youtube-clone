import styled from 'styled-components';
import {
  CONTAINER_HORIZONTAL_PADDING,
  MOBILE_BREAK_POINT,
  NAV_BAR_HEIGHT,
} from '../../layout/style';

export const Container = styled.section`
  position: relative;
  margin: ${NAV_BAR_HEIGHT}px auto;
  width: 100%;
  max-width: 1850px;
  padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 20px 0;
  }
`;

export const VideoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  list-style: none;
`;

export const VideoItem = styled.li``;
