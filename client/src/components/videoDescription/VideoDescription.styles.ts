import styled from 'styled-components';
import { BORDER_RADIUS_ROUND, MOBILE_BREAK_POINT } from '../../layout/style';

export const VideoDescriptionContainer = styled.div<{ showMoreText: boolean | null }>`
  position: relative;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  border-radius: ${BORDER_RADIUS_ROUND}px;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  color: ${(props) => props.theme.textColor};
  font-size: 0.85rem;
  &:hover {
    background-color: ${(props) =>
      props.showMoreText ? props.theme.uiSecondaryBg : props.theme.normalBtn.bgHover};
    cursor: ${(props) => (props.showMoreText ? 'normal' : 'pointer')};
  }
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    margin: 10px 20px;
    width: calc(100% - 40px);
  }
`;

export const VideoDescriptionStats = styled.p`
  display: flex;
  gap: 5px;
  font-weight: 600;
`;

export const VideoDescriptionText = styled.p<{ showMoreText: boolean | null }>`
  word-wrap: break-word;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) =>
    props.showMoreText === true ? '0' : props.showMoreText === false ? '3' : '0'};
  overflow: hidden;
  width: 50%;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    width: auto;
  }
`;

export const VideoDescriptionShowMoreBtn = styled.button`
  position: relative;
  padding: 5px;
  left: -5px;
  color: ${(props) => props.theme.accentColor};
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 10px;
`;
