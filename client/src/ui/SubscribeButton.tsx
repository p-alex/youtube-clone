import styled from 'styled-components';
import { BORDER_RADIUS_ROUNDER } from '../layout/style';
export const SubscribeButton = styled.button<{ variant: 'subed' | 'normal' }>`
  padding: 8px 16px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.85rem;
  height: 35px;
  color: ${(props) =>
    props.variant === 'subed'
      ? props.theme.subscribeBtn.subedTextColor
      : props.theme.subscribeBtn.textColor};
  background-color: ${(props) =>
    props.variant === 'subed'
      ? props.theme.subscribeBtn.subedBg
      : props.theme.subscribeBtn.bg};
  border-radius: ${BORDER_RADIUS_ROUNDER}px;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'subed'
        ? props.theme.subscribeBtn.subedBgHover
        : props.theme.subscribeBtn.bgHover};
  }
`;
