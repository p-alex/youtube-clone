import Link from 'next/link';
import React from 'react';
import { IChannel } from '../../../app/features/subscriptionsSlice';
import SubscribeButton from '../../../ui/SubscribeButton';
import { Text } from '../../../ui/Text';
import {
  ChannelCard__Body,
  ChannelCard__Container,
  ChannelCard__Description,
  ChannelCard__Image,
  ChannelCard__Username,
} from './ChannelCard.styles';

const ChannelCard = ({ user, hideSubBtn }: { user: IChannel; hideSubBtn?: boolean }) => {
  return (
    <ChannelCard__Container>
      <Link href={'/profile/' + user.user_id + '/videos'}>
        <a>
          <ChannelCard__Image width={150} height={150} src={user.profile_picture} />
          <ChannelCard__Body>
            <Link href={'/profile/' + user.user_id + '/videos'}>
              <ChannelCard__Username>{user.username}</ChannelCard__Username>
            </Link>
            <Text size="small" isMuted>
              {`${user.total_subscribers} subscribers • ${user.total_videos} videos`}
            </Text>
            {user.description && (
              <ChannelCard__Description>{user.description}</ChannelCard__Description>
            )}
          </ChannelCard__Body>
        </a>
      </Link>
      {!hideSubBtn && (
        <SubscribeButton
          subscribeToUserId={user.user_id}
          subscribeToUsername={user.username}
          subscribeToProfilePicture={user.profile_picture}
          changeStateIn={'manageSubscriptions'}
        />
      )}
    </ChannelCard__Container>
  );
};

export default ChannelCard;
