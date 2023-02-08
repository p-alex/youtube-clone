import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ISubscriptionUser } from '../../app/features/subscriptionsSlice';
import SubscribeButton from '../../ui/SubscribeButton';
import { Text } from '../../ui/Text';
import {
  ChannelCard__Body,
  ChannelCard__Container,
  ChannelCard__Description,
  ChannelCard__Username,
} from './ChannelCard.styles';

const ChannelCard = ({ user }: { user: ISubscriptionUser }) => {
  return (
    <ChannelCard__Container>
      <Link href={'/profile/' + user.username + '/videos'}>
        <a>
          <Image width={150} height={150} src={user.profile_picture} alt="" />
        </a>
      </Link>
      <ChannelCard__Body>
        <ChannelCard__Username>{user.username}</ChannelCard__Username>
        <Text size="small" isMuted>
          {`${user.total_subscribers} subscribers • ${user.total_videos} videos`}
        </Text>
        <ChannelCard__Description>{user.description}</ChannelCard__Description>
        <SubscribeButton
          subscribeToUserId={user.user_id}
          subscribeToUsername={user.username}
          changeStateIn={'manageSubscriptions'}
        />
      </ChannelCard__Body>
    </ChannelCard__Container>
  );
};

export default ChannelCard;
