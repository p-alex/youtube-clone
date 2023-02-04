import React from 'react';
import {
  VideoPageHeader__BtnsRow,
  VideoPageHeader__ColumnContainer,
  VideoPageHeader__Container,
  VideoPageHeader__Subscribers,
  VideoPageHeader__Title,
  VideoPageHeader__UserInfo,
  VideoPageHeader__Username,
} from './VideoPageHeader.styles';
import { VideoInfo } from '../../../app/features/videoSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import ProfileImage from '../../../ui/ProfileImage';
import SubscribeButton from '../../../ui/SubscribeButton';
import LikeDislikeVideoGroup from '../../../ui/LikeDislikeVideoGroup';

const VideoPageHeader = ({ video }: { video: VideoInfo }) => {
  const currentUserId = useSelector((state: RootState) => state.auth.user.user_id);

  return (
    <VideoPageHeader__Container>
      <VideoPageHeader__Title>{video.title}</VideoPageHeader__Title>
      <VideoPageHeader__BtnsRow>
        <VideoPageHeader__UserInfo>
          <ProfileImage
            imageUrl={video.profile_picture}
            width={40}
            height={40}
            username={video.username}
          />
          <VideoPageHeader__ColumnContainer>
            <VideoPageHeader__Username>{video.username}</VideoPageHeader__Username>
            <VideoPageHeader__Subscribers>
              {video.total_subscribers}{' '}
              {video.total_subscribers === 1 ? 'subscriber' : 'subsribers'}
            </VideoPageHeader__Subscribers>
          </VideoPageHeader__ColumnContainer>
          {video.user_id !== currentUserId && (
            <SubscribeButton
              isSubscribed={false}
              subscribeToUserId={video.user_id}
              subscribeToUsername={video.username}
              changeStateIn={'videopage'}
              withConfirmation
            />
          )}
        </VideoPageHeader__UserInfo>
        <LikeDislikeVideoGroup video={video} />
      </VideoPageHeader__BtnsRow>
    </VideoPageHeader__Container>
  );
};

export default VideoPageHeader;
