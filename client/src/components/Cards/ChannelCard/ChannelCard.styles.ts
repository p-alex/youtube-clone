import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../layout/style';

export const ChannelCard__Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: var(--space-medium);
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;

export const ChannelCard__Image = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: var(--space-small);
`;

export const ChannelCard__Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-small);
  @media (max-width: 450px) {
    align-items: center;
  }
`;

export const ChannelCard__Username = styled.h2`
  font-size: 1.4rem;
  color: ${(props) => props.theme.textColor};
`;

export const ChannelCard__Description = styled.p`
  margin-top: var(--space-small);
  color: ${(props) => props.theme.textMutedColor};
  width: 100%;
  word-break: break-all;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
