import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const Logo__Container = styled.a`
  display: flex;
  align-items: center;
  gap: var(--space-small);
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

export const Logo__Custom = styled.div`
  position: relative;
  width: 40px;
  height: 30px;
  background-color: #ff0000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${BORDER_RADIUS_ROUND}px;
  & svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;
