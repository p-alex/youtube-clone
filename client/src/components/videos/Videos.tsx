import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import VideoCard from '../videoCard/VideoCard';
import { Container, VideoItem, VideoList } from './style';

const Videos = () => {
  const videos = useSelector((state: RootState) => state.video.videos);
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
