import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Body,
  Container,
  Details,
  Duration,
  ProfilePicture,
  Stats,
  Thumbnail,
  ThumbnailContainer,
  Title,
  Username,
} from './style';
import { dateConverter } from '../../utils/dateConverter';
import { IVideoSmall } from '../../app/features/videoSlice';
import { videoDurationFormatter } from '../../utils/videoDurationFormatter';

const VideoCard = ({
  video,
  withProfilePicture,
}: {
  video: IVideoSmall;
  withProfilePicture: boolean;
}) => {
  return (
    <Container>
      <Link href={`/videos/${video.video_id}`}>
        <ThumbnailContainer>
          <Thumbnail
            as={Image}
            src={video.thumbnail_url}
            alt=""
            width={700}
            height={393}
          />
          <Duration>{videoDurationFormatter(video.duration)}</Duration>
        </ThumbnailContainer>
      </Link>
      <Body>
        {withProfilePicture && (
          <ProfilePicture src={video.profile_picture} width={36} height={36} />
        )}
        <Details>
          <Link href={`/videos/${video.video_id}`}>
            <Title>{video.title}</Title>
          </Link>
          <Username>{video.username}</Username>
          <Stats>
            {video.views} views • {dateConverter(new Date(video.created_at).getTime())}
          </Stats>
        </Details>
      </Body>
    </Container>
  );
};

export default VideoCard;
