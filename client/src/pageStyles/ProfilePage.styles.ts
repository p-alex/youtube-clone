import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../layout/style';

export const ProfilePage__Container = styled.div`
  position: relative;
  max-width: 1250px;
  margin: auto;
  @media (max-width: 1240px) {
    margin: 0 20px;
  }
`;

export const ProfilePage__Banner = styled.div<{ bannerColor: string }>`
  position: relative;
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.bannerColor};
  border-top-left-radius: ${BORDER_RADIUS_ROUND}px;
  border-top-right-radius: ${BORDER_RADIUS_ROUND}px;
`;

export const ProfilePage__Header = styled.div`
  position: relative;
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfilePage__UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ProfilePage__UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ProfilePage__Username = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

export const ProfilePage__SmallText = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textMutedColor};
`;

export const ProfilePage__Navigation = styled.div`
  display: flex;
`;

export const ProfilePage__NavBtn = styled.div<{ isActive: boolean }>`
  padding: 10px 20px;
  font-weight: 700;
  border-bottom: solid 4px
    ${(props) => (props.isActive ? props.theme.borderColor : 'transparent')};
  color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.textMutedColor};
  cursor: pointer;
`;
