import Image from 'next/image';
import React from 'react';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import { dateConverter } from '../../utils/dateConverter';
import ProfileImage from '../../ui/ProfileImage';
import {
  VideoCardWithInfo_Container,
  VideoCardWithInfo__Body,
  VideoCardWithInfo__Description,
  VideoCardWithInfo__ThumbnailContainer,
  VideoCardWithInfo__Title,
  VideoCardWithInfo__UserContainer,
  VideoCardWithInfo__Username,
  VideoCardWithInfo__ViewsAndDate,
} from './VideoCardWithInfo.styles';
import Link from 'next/link';
import { videoDurationFormatter } from '../../utils/videoDurationFormatter';
import VideoDuration from '../../ui/VideoDuration';

const VideoCardWithInfo = ({ video }: { video: IVideoSmallWithInfo }) => {
  return (
    <VideoCardWithInfo_Container>
      <VideoCardWithInfo__ThumbnailContainer>
        <Link href={`/videos/${video.video_id}`}>
          <a>
            <Image
              src={video.thumbnail_url}
              width={600}
              height={352.5}
              objectFit={'cover'}
              alt=""
            />
          </a>
        </Link>
        <VideoDuration>{videoDurationFormatter(video.duration)}</VideoDuration>
      </VideoCardWithInfo__ThumbnailContainer>

      <VideoCardWithInfo__Body>
        <Link href={`/videos/${video.video_id}`}>
          <a>
            <VideoCardWithInfo__Title>{video.title}</VideoCardWithInfo__Title>
          </a>
        </Link>
        <VideoCardWithInfo__ViewsAndDate>
          {video.views} views • {dateConverter(new Date(video.created_at).getTime())}
        </VideoCardWithInfo__ViewsAndDate>

        <VideoCardWithInfo__UserContainer>
          <ProfileImage
            imageUrl={video.profile_picture}
            width={24}
            height={24}
            username={video.username}
          />
          <VideoCardWithInfo__Username>
            <Link href={`/profile/${video.username}`}>{video.username}</Link>
          </VideoCardWithInfo__Username>
        </VideoCardWithInfo__UserContainer>

        <VideoCardWithInfo__Description>
          {video.description}
        </VideoCardWithInfo__Description>
      </VideoCardWithInfo__Body>
    </VideoCardWithInfo_Container>
  );
};

export default VideoCardWithInfo;
