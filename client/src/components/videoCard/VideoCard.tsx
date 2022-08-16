import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IVideo } from '../../app/features/videoSlice';
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

const VideoCard = ({ video }: { video: IVideo }) => {
  return (
    <Container>
      <Link href={'/video/1'}>
        <Thumbnail as={Image} src={video.image} alt="" width={700} height={393} />
      </Link>
      <Body>
        <ProfilePicture src={video.profile_picture} width={36} height={36} />
        <Details>
          <Link href={'/video/1'}>
            <Title>{video.title}</Title>
          </Link>
          <Username>{video.username}</Username>
          <Stats>
            {video.views} views • {video.createdAt}
          </Stats>
        </Details>
      </Body>
    </Container>
  );
};

export default VideoCard;
