import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../../layout/style';

export const ManageVideoCard__Container = styled.div`
  background-color: ${(props) => props.theme.uiBg};
  margin-bottom: var(--space-big);
`;

export const ManageVideoCard__Image = styled.div`
  position: relative;
  display: flex;
  margin-bottom: var(--space-small);
`;

export const ManageVideoCard__Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  margin-bottom: var(--space-big);
`;

export const ManageVideoCard__Title = styled.h2`
  color: ${(props) => props.theme.textColor};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const ManageVideoCard__Items = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  flex-wrap: wrap;
`;

export const ManageVideoCard__Item = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  background-color: ${(props) => props.theme.uiSecondaryBg};
  padding: 4px var(--space-small);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.85rem;
  svg {
    font-size: 1rem;
  }
`;
