import React from 'react';
import styled from 'styled-components';
import { AiOutlineGoogle } from 'react-icons/ai';
import { BORDER_RADIUS_ROUND } from '../layout/style';
import getGoogleOAuthURL from '../utils/getGoogleUrl';

const PROVIDERS = {
  google: {
    icon: <AiOutlineGoogle />,
    href: getGoogleOAuthURL(),
  },
};

const ProviderLink = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-small);
  padding: var(--space-small);
  border-radius: ${BORDER_RADIUS_ROUND}px;
  font-size: 1rem;
  margin-bottom: var(--space-small);
  font-weight: 700;
  text-transform: capitalize;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 150ms ease-in-out;
  & svg {
    font-size: 2rem;
  }
  &.google {
    background-color: RGB(66, 133, 244);
    color: white;
  }
  &.google:hover {
    background-color: rgb(66, 158, 244);
  }
`;

const AuthProviderLink = ({
  providerName,
  children,
}: {
  providerName: keyof typeof PROVIDERS;
  children: string;
}) => {
  return (
    <ProviderLink href={PROVIDERS[providerName].href} className={providerName}>
      {PROVIDERS[providerName].icon} {children}
    </ProviderLink>
  );
};

export default AuthProviderLink;
