import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Body,
  Container,
  Details,
  Stats,
  Thumbnail,
  ThumbnailContainer,
  Title,
  Username,
} from './style';
import { IVideoSmall } from '../../app/features/videoSlice';

const SuggestionCard = ({ video }: { video: IVideoSmall }) => {
  return (
    <Container>
      <Body>
        <ThumbnailContainer>
          <Link href={'/video/1'}>
            <a>
              <Thumbnail
                as={Image}
                src={video.thumbnail_url}
                alt=""
                width={550}
                height={309.375}
              />
            </a>
          </Link>
        </ThumbnailContainer>
        <Details>
          <Link href={'/video/1'}>
            <a>
              <Title>{video.title}</Title>
            </a>
          </Link>
          <Username>{video.username}</Username>
          <Stats>
            {video.views} views • {video.created_at}
          </Stats>
        </Details>
      </Body>
    </Container>
  );
};

export default SuggestionCard;
