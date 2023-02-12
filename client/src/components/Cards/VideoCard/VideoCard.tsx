import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  VideoCard__Body,
  VideoCard__Container,
  VideoCard__Details,
  VideoCard__ProfilePicture,
  VideoCard__Stats,
  VideoCard__Thumbnail,
  VideoCard__ThumbnailContainer,
  VideoCard__Title,
  VideoCard__Username,
} from './VideoCard.styles';
import { dateConverter } from '../../../utils/dateConverter';
import { IVideoSmall } from '../../../app/features/videoSlice';
import { videoDurationFormatter } from '../../../utils/videoDurationFormatter';
import VideoDuration from '../../../ui/VideoDuration';
import ProfileImage from '../../../ui/ProfileImage';

const VideoCard = ({
  video,
  withProfilePicture,
}: {
  video: IVideoSmall;
  withProfilePicture: boolean;
}) => {
  return (
    <VideoCard__Container>
      <Link href={`/videos/${video.video_id}`}>
        <VideoCard__ThumbnailContainer>
          <VideoCard__Thumbnail
            as={Image}
            src={video.thumbnail_url}
            alt=""
            width={700}
            height={393}
          />
          <VideoDuration>{videoDurationFormatter(video.duration)}</VideoDuration>
        </VideoCard__ThumbnailContainer>
      </Link>
      <VideoCard__Body>
        {withProfilePicture && (
          <ProfileImage
            width={35}
            height={35}
            imageUrl={video.profile_picture}
            userId={video.user_id}
          />
        )}
        <VideoCard__Details>
          <Link href={`/videos/${video.video_id}`}>
            <VideoCard__Title>{video.title}</VideoCard__Title>
          </Link>
          <Link href={`/profile/${video.user_id}/videos`}>
            <VideoCard__Username>{video.username}</VideoCard__Username>
          </Link>
          <VideoCard__Stats>
            {video.views} views • {dateConverter(new Date(video.created_at).getTime())}
          </VideoCard__Stats>
        </VideoCard__Details>
      </VideoCard__Body>
    </VideoCard__Container>
  );
};

export default VideoCard;
