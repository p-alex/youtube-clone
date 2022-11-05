import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IVideoSmallWithInfo } from '../../app/features/videoSlice';
import {
  VideoCardWithInfoBody,
  VideoCardWithInfoContainer,
  VideoCardWithInfoDescription,
  VideoCardWithInfoHeader,
  VideoCardWithInfoTitle,
  VideoCardWithInfoViewsAndUsername,
} from './VideoCardWithInfo.styles';

const VideoCardWithInfo = ({ video }: { video: IVideoSmallWithInfo }) => {
  return (
    <Link href={`/videos/${video.video_id}`}>
      <a>
        <VideoCardWithInfoContainer>
          <Image src={video.thumbnail_url} width="360" height="202.5" alt={video.title} />
          <VideoCardWithInfoBody>
            <VideoCardWithInfoHeader>
              <VideoCardWithInfoTitle>{video.title}</VideoCardWithInfoTitle>
              <VideoCardWithInfoViewsAndUsername>
                {video.views} views •{' '}
                <Image src={video.profile_picture} width="20" height={'20'} alt="" />{' '}
                {video.username}
              </VideoCardWithInfoViewsAndUsername>
            </VideoCardWithInfoHeader>
            <VideoCardWithInfoDescription>
              {video.description}
            </VideoCardWithInfoDescription>
          </VideoCardWithInfoBody>
        </VideoCardWithInfoContainer>
      </a>
    </Link>
  );
};

export default VideoCardWithInfo;
