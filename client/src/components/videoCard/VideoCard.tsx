import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Body,
  Container,
  Details,
  ProfilePicture,
  Stats,
  Thumbnail,
  Title,
  Username,
} from './style';
import { dateConverter } from '../../utils/dateConverter';
import { IVideoSmall } from '../../app/features/videoSlice';

const VideoCard = ({ video }: { video: IVideoSmall }) => {
  return (
    <Container>
      <Link href={`/videos/${video.video_id}`}>
        <Thumbnail as={Image} src={video.thumbnail_url} alt="" width={700} height={393} />
      </Link>
      <Body>
        <ProfilePicture src={video.profile_picture} width={36} height={36} />
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
