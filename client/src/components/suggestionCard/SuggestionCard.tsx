import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Body,
  Container,
  Details,
  Duration,
  Stats,
  Thumbnail,
  ThumbnailContainer,
  Title,
  Username,
} from './style';
import { IVideoSmall } from '../../app/features/videoSlice';
import { dateConverter } from '../../utils/dateConverter';
import { videoDurationFormatter } from '../../utils/videoDurationFormatter';

const SuggestionCard = ({ video }: { video: IVideoSmall }) => {
  return (
    <Container>
      <Body>
        <ThumbnailContainer>
          <Link href={`/videos/${video.video_id}`}>
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
          <Duration>{videoDurationFormatter(video.duration)}</Duration>
        </ThumbnailContainer>
        <Details>
          <Link href={'/video/1'}>
            <a>
              <Title>{video.title}</Title>
            </a>
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

export default SuggestionCard;
