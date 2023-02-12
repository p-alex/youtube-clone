import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  SuggestionCard__Body,
  SuggestionCard__Container,
  SuggestionCard__Details,
  SuggestionCard__Stats,
  SuggestionCard__ThumbnailContainer,
  SuggestionCard__Title,
  SuggestionCard__Username,
} from './SuggestionCard.styles';
import { IVideoSmall } from '../../../app/features/videoSlice';
import { dateConverter } from '../../../utils/dateConverter';
import { videoDurationFormatter } from '../../../utils/videoDurationFormatter';
import VideoDuration from '../../../ui/VideoDuration';

const SuggestionCard = ({ video }: { video: IVideoSmall }) => {
  return (
    <SuggestionCard__Container>
      <SuggestionCard__Body>
        <SuggestionCard__ThumbnailContainer>
          <Link href={`/videos/${video.video_id}`}>
            <a>
              <Image src={video.thumbnail_url} alt="" width={550} height={309.375} />
            </a>
          </Link>
          <VideoDuration>{videoDurationFormatter(video.duration)}</VideoDuration>
        </SuggestionCard__ThumbnailContainer>
        <SuggestionCard__Details>
          <Link href={`/videos/${video.video_id}`}>
            <a>
              <SuggestionCard__Title title={video.title}>
                {video.title}
              </SuggestionCard__Title>
            </a>
          </Link>
          <Link href={`/profile/${video.user_id}/videos`}>
            <SuggestionCard__Username>{video.username}</SuggestionCard__Username>
          </Link>
          <SuggestionCard__Stats>
            {video.views} views • {dateConverter(new Date(video.created_at).getTime())}
          </SuggestionCard__Stats>
        </SuggestionCard__Details>
      </SuggestionCard__Body>
    </SuggestionCard__Container>
  );
};

export default SuggestionCard;
