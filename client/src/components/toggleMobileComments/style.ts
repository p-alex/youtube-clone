import styled from 'styled-components';
import { CONTAINER_HORIZONTAL_PADDING } from '../../layout/style';

export const ToggleMobileCommentsBtn = styled.button`
  display: flex;
  width: 100%;
  padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.textColor};
`;

export const Title = styled.p`
  & span {
    color: ${(props) => props.theme.textMutedColor};
  }
`;
