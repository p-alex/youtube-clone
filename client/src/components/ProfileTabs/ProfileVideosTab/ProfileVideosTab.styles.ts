import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../layout/style';

export const ProfileVideosTab__Container = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const ProfileVideosTab__SortBtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  margin-bottom: var(--space-big);
`;

export const ProfileVideosTab__VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-medium);
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
