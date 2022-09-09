import React, { useEffect, useRef } from 'react';
import VideoCard from '../videoCard/VideoCard';
import { Container, VideoItem, VideoList } from './style';
import useAxios from '../../hooks/useAxios';
import { IVideoSmall, setVideos } from '../../app/features/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';

const Videos = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.videos.videos);

  const effectRan = useRef(false);

  const [getVideos, { isLoading, errors }] = useAxiosWithRetry<{ videos: IVideoSmall[] }>(
    'api/videos',
    {
      accessToken: accessToken ? accessToken : '',
    }
  );

  const handleGetVideos = async () => {
    const response = await getVideos();
    if (response.success && response.result) {
      dispatch(setVideos(response.result.videos));
    }
  };

  useEffect(() => {
    if (effectRan.current) return;
    !videos.length && handleGetVideos();
    return () => {
      effectRan.current = true;
    };
  }, []);

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
