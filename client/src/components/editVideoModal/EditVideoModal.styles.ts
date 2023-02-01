import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const EditVideoModal__ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: var(--space-big);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditVideoModal__HiddenInput = styled.input`
  display: none;
`;

export const EditVideoModal__TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-small);
`;

export const EditVideoModal__Tag = styled.p`
  background-color: ${(props) => props.theme.normalBtn.bg};
  color: ${(props) => props.theme.textColor};
  padding: var(--space-small) var(--space-medium);
  border-radius: ${BORDER_RADIUS_ROUND}px;
`;

export const EditVideoModal__SubmitContainer = styled.div`
  display: flex;
  gap: var(--space-big);
  align-items: center;
`;

export const EditVideoModal__ResultMessage = styled.p<{ isSuccess: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.isSuccess ? '#95C623' : 'red')};
  font-size: 0.85rem;
`;
