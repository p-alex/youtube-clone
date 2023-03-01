import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { IChannelMini } from '../app/features/subscriptionsSlice';
import { Text } from './Text';

const SubscriptionMiniButton__Container = styled.a`
  display: flex;
  align-items: center;
  gap: var(--space-medium);
  padding: var(--space-small) var(--space-medium);
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
  img {
    border-radius: 50%;
  }
`;

interface Props {
  subscription: IChannelMini;
}

const SubscriptionMiniButton = ({ subscription }: Props) => {
  return (
    <Link href={'/profile/' + subscription.user_id + '/videos'}>
      <SubscriptionMiniButton__Container>
        <Image src={subscription.profile_picture} width={24} height={24} alt="" />
        <Text>{subscription.username}</Text>
      </SubscriptionMiniButton__Container>
    </Link>
  );
};

export default SubscriptionMiniButton;
