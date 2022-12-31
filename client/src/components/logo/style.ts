import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const BigLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  cursor: pointer;
`;

export const CustomLogo = styled.div`
  width: 35px;
  height: 25px;
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &::after {
    content: '►';
    position: relative;
    color: ${(props) => props.theme.uiBg};
    font-size: 0.85rem;
  }
`;
