import styled from 'styled-components';
import { BORDER_RADIUS_ROUND } from '../../layout/style';

export const Footer__Container = styled.footer`
  position: relative;
  padding: var(--space-big);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--space-medium);
  text-align: center;
  margin: auto var(--space-medium) var(--space-medium) var(--space-medium);
  background-color: ${(props) => props.theme.uiSecondaryBg};
  font-size: 0.85rem;
  color: ${(props) => props.theme.textMutedColor};
  border-radius: ${BORDER_RADIUS_ROUND}px;
  & span {
    font-weight: 700;
    color: ${(props) => props.theme.textColor};
  }
`;

export const Footer__Socials = styled.div`
  display: flex;
  gap: var(--space-small);
`;

export const Footer__SocialLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    font-size: 2.2rem;
    color: ${(props) => props.theme.textColor};
    transition: color 150ms ease-in-out;
  }
  &:hover svg {
    color: ${(props) => props.theme.textColor};
  }
`;
