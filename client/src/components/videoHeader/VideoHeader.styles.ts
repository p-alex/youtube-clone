import styled from 'styled-components';
import { BORDER_RADIUS_ROUNDER, MOBILE_BREAK_POINT } from '../../layout/style';

export const VideoHeaderContainer = styled.header`
  position: relative;
  width: 100%;
  margin-top: 10px;
  & img {
    border-radius: 50%;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    padding: 10px 20px;
  }
`;

export const VideoHeaderTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const VideoHeaderBtnsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const VideoHeaderUserInfo = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const VideoHeaderColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    flex: 1;
  }
`;

export const VideoHeaderUsername = styled.p`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
`;

export const VideoHeaderSubscribers = styled.small`
  color: ${(props) => props.theme.textMutedColor};
`;

export const LikeDislikeGroup = styled.div`
  position: relative;
  border-radius: ${BORDER_RADIUS_ROUNDER}px;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  display: flex;
  align-items: center;
  height: 35px;
`;

export const LikeDislikeBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  height: 100%;
  padding: 0 15px;
  gap: 6px;
  font-size: 1rem;
  font-weight: 600;
  svg {
    font-size: 1.2rem;
  }
  &:first-of-type {
    border-top-left-radius: ${BORDER_RADIUS_ROUNDER}px;
    border-bottom-left-radius: ${BORDER_RADIUS_ROUNDER}px;
  }
  &:last-of-type {
    border-top-right-radius: ${BORDER_RADIUS_ROUNDER}px;
    border-bottom-right-radius: ${BORDER_RADIUS_ROUNDER}px;
  }
  &:last-of-type::before {
    content: '';
    position: absolute;
    height: 70%;
    width: 1px;
    background-color: ${(props) => props.theme.borderColor};
    left: 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;
