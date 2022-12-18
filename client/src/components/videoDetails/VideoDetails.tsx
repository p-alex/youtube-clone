import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { VideoInfo } from '../../app/features/videoSlice';
import { RootState } from '../../app/store';
import useAuth from '../../hooks/useAuth';
import { SubscribeButton } from '../../ui/SubscribeButton';
import {
  Description,
  Details,
  DetailsContainer,
  DetailsHeader,
  ProfilePicture,
  SubCount,
  Username,
  UsernameAndSubsContainer,
} from './style';

const VideoDetails = ({ video }: { video: VideoInfo }) => {
  const profile_picture = useSelector(
    (state: RootState) => state.auth.user?.profile_picture
  );
  const { isAuth } = useAuth();
  return (
    <DetailsContainer>
      <ProfilePicture
        as={Image}
        src={profile_picture ? profile_picture : '/images/default-profile-picture.jpg'}
        width={48}
        height={48}
        alt=""
      />
      <Details>
        <DetailsHeader>
          <UsernameAndSubsContainer>
            <Username>{video.username}</Username>
            <SubCount>{video.total_subscribers} subscribers</SubCount>
          </UsernameAndSubsContainer>
          {isAuth && <SubscribeButton variant={'normal'}>Subscribe</SubscribeButton>}
        </DetailsHeader>
        <Description>{video.description}</Description>
      </Details>
    </DetailsContainer>
  );
};

export default VideoDetails;
