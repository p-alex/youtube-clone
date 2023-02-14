import Link from 'next/link';
import React from 'react';
import { ISubscriptionUser } from '../../../app/features/subscriptionsSlice';
import ProfileImage from '../../../ui/ProfileImage';
import SubscribeButton from '../../../ui/SubscribeButton';
import { Text } from '../../../ui/Text';
import {
  ChannelCard__Body,
  ChannelCard__Container,
  ChannelCard__Description,
  ChannelCard__Username,
} from './ChannelCard.styles';

const ChannelCard = ({ user }: { user: ISubscriptionUser }) => {
  return (
    <ChannelCard__Container>
      <Link href={'/profile/' + user.user_id + '/videos'}>
        <a>
          <ProfileImage
            width={150}
            height={150}
            imageUrl={user.profile_picture}
            userId={user.user_id}
          />
        </a>
      </Link>
      <ChannelCard__Body>
        <Link href={'/profile/' + user.user_id + '/videos'}>
          <ChannelCard__Username>{user.username}</ChannelCard__Username>
        </Link>
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
