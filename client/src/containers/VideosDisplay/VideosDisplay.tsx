import React from 'react';
import { IVideoSmall } from '../../app/features/videoSlice';
import NoResultsMessage from '../../ui/NoResultsMessage';
import VideoCard from '../../components/Cards/VideoCard/VideoCard';
import {
  VideosDisplay__Container,
  VideosDisplay__VideoItem,
  VideosDisplay__VideoList,
} from './VideosDisplay.styles';

const VideosDisplay = ({ videos }: { videos: IVideoSmall[] }) => {
  return (
    <VideosDisplay__Container>
      <VideosDisplay__VideoList>
        {videos.map((video, index) => {
          return (
            <VideosDisplay__VideoItem key={index}>
              <VideoCard video={video} withProfilePicture={true} />
            </VideosDisplay__VideoItem>
          );
        })}
      </VideosDisplay__VideoList>
    </VideosDisplay__Container>
  );
};

export default VideosDisplay;
