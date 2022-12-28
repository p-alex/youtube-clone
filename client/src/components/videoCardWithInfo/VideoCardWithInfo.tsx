import Image from 'next/image';
import React from 'react';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import { dateConverter } from '../../utils/dateConverter';
import ProfileImage from '../../ui/ProfileImage';
import {
  VideoCardWithInfo_Container,
  VideoCardWithInfo__Body,
  VideoCardWithInfo__Description,
  VideoCardWithInfo__Duration,
  VideoCardWithInfo__ThumbnailContainer,
  VideoCardWithInfo__Title,
  VideoCardWithInfo__UserContainer,
  VideoCardWithInfo__Username,
  VideoCardWithInfo__ViewsAndDate,
} from './VideoCardWithInfo.styles';
import Link from 'next/link';
import { videoDurationFormatter } from '../../utils/videoDurationFormatter';

const VideoCardWithInfo = ({ video }: { video: IVideoSmallWithInfo }) => {
  return (
    <Link href={`/videos/${video.video_id}`}>
      <a>
        <VideoCardWithInfo_Container>
          <VideoCardWithInfo__ThumbnailContainer>
            <Image
              src={video.thumbnail_url}
              width={600}
              height={352.5}
              objectFit={'cover'}
              alt=""
            />
            <VideoCardWithInfo__Duration>
              {videoDurationFormatter(video.duration)}
            </VideoCardWithInfo__Duration>
          </VideoCardWithInfo__ThumbnailContainer>

          <VideoCardWithInfo__Body>
            <VideoCardWithInfo__Title>{video.title}</VideoCardWithInfo__Title>
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
                <Link href="#">{video.username}</Link>
              </VideoCardWithInfo__Username>
            </VideoCardWithInfo__UserContainer>

            <VideoCardWithInfo__Description>
              {video.description}
            </VideoCardWithInfo__Description>
          </VideoCardWithInfo__Body>
        </VideoCardWithInfo_Container>
      </a>
    </Link>
  );
};

export default VideoCardWithInfo;
