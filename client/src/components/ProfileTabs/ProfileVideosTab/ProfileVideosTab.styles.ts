import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../layout/style';

export const ProfileVideosTab__Container = styled.div`
  position: relative;
  margin-top: 20px;
`;

export const ProfileVideosTab__SortBtnsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ProfileVideosTab__SortBtn = styled.button<{ isActive: boolean }>`
  padding: 7px 20px;
  background-color: ${(props) =>
    props.isActive ? props.theme.normalBtn.bgHover : props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;

export const ProfileVideosTab__VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
