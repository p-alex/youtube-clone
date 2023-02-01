import styled from 'styled-components';
import { BORDER_RADIUS_ROUNDER } from '../layout/style';

export const Button = styled.button<{
  variant: 'primary' | 'normal' | 'danger';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: ${BORDER_RADIUS_ROUNDER}px;
  height: 35px;
  font-size: 0.85rem;
  width: max-content;
  background-color: ${(props) =>
    props.variant === 'primary'
      ? `${props.theme.accentColor}`
      : props.variant === 'danger'
      ? props.theme.dangerBtn.bg
      : props.theme.normalBtn.bg};
  padding: var(--space-small) var(--space-medium);
  color: ${(props) =>
    props.variant === 'primary'
      ? props.theme.primaryBtn.textColor
      : props.variant === 'danger'
      ? props.theme.dangerBtn.textColor
      : props.theme.normalBtn.textColor};
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    /* background-color: ${(props) =>
      props.variant === 'primary'
        ? props.theme.primaryBtn.bgHover
        : props.variant === 'danger'
        ? props.theme.dangerBtn.bgHover
        : props.theme.normalBtn.bgHover}; */
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
  }
`;
