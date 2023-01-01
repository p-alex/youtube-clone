import React from 'react';
import { IVideoSmall } from '../../app/features/videoSlice';
import VideoCard from '../VideoCard/VideoCard';
import { Container, VideoItem, VideoList } from './style';

const Videos = ({ videos }: { videos: IVideoSmall[] }) => {
  return (
    <Container>
      <VideoList>
        {videos.map((video, index) => {
          return (
            <VideoItem key={index}>
              <VideoCard video={video} withProfilePicture={true} />
            </VideoItem>
          );
        })}
      </VideoList>
    </Container>
  );
};

export default Videos;
