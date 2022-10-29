import React from 'react';
import VideoCard from '../videoCard/VideoCard';
import { Container, VideoItem, VideoList } from './style';
import { IVideoSmall } from '../../pages';

const Videos = ({ videos }: { videos: IVideoSmall[] }) => {
  return (
    <Container>
      <VideoList>
        {videos.map((video, index) => {
          return (
            <VideoItem key={index}>
              <VideoCard video={video} />
            </VideoItem>
          );
        })}
      </VideoList>
    </Container>
  );
};

export default Videos;
