import styled from 'styled-components';
import { MOBILE_BREAK_POINT, NAV_BAR_HEIGHT } from '../layout/style';

export const ManageVideosPage__Container = styled.div`
  position: relative;
  margin: calc(${NAV_BAR_HEIGHT}px + 20px) auto;
  max-width: 1200px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: calc(${NAV_BAR_HEIGHT}px + 20px) 10px;
  }
`;

export const ManageVideosPage__Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 20px;
`;

export const ManageVideosPage__VideoCards = styled.div`
  display: grid;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;
