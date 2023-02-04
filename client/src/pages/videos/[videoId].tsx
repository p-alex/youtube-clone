import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { resetVideo, setVideo, VideoInfo } from '../../app/features/videoSlice';
import { useDispatch } from 'react-redux';
import useMobileSize from '../../hooks/screenSizeHooks/useMobileSize';
import { DefaultResponse } from '../../hooks/requestHooks/useAxiosWithRetry';
import CommentSection from '../../containers/CommentSection/CommentSection';
import { CommentSectionProvider } from '../../context/CommentSectionContext/CommentSectionProvider';
import {
  VideoColumn,
  VideoContainer,
  VideoDetailsContainer,
  VideoDetailsWrapper,
  VideoPageContainer,
} from '../../pageStyles/VideoPage.styles';
import SuggestionsSideBar from '../../components/VideoPageComponents/SuggestionsSideBar/SuggestionsSideBar';
import VideoPlayer from '../../components/VideoPageComponents/VideoPlayer/VideoPlayer';
import VideoPageDescription from '../../components/VideoPageComponents/VideoPageDescription/VideoPageDescription';
import VideoPageHeader from '../../components/VideoPageComponents/VideoPageHeader/VideoPageHeader';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = context.params?.videoId as string;
  const res = await axios.get<undefined, { data: DefaultResponse<{ video: VideoInfo }> }>(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/videos/${videoId}`
  );
  const video = res.data.result?.video;
  return {
    props: { video },
  };
};

const VideoPage = ({ video }: { video: VideoInfo }) => {
  const dispatch = useDispatch();
  const [videoPlayerType, setVideoPlayerType] = useState<'desktop' | 'mobile' | ''>('');
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const isMobileSize = useMobileSize();
  const videoId = useRouter().query.videoId;

  useEffect(() => {
    setIsTheatreMode(false);
    if (isMobileSize && !videoPlayerType) {
      setVideoPlayerType('mobile');
    } else if (!isMobileSize && !videoPlayerType) {
      setVideoPlayerType('desktop');
    }
  }, [isMobileSize]);

  useEffect(() => {
    dispatch(setVideo(video));
    return () => {
      if (video.video_id) dispatch(resetVideo());
    };
  }, []);

  return (
    <Layout head={{ title: video?.title, description: video?.description }}>
      {video.video_id === videoId && (
        <VideoPageContainer className={isTheatreMode ? 'theatre-mode' : ''}>
          <VideoColumn>
            <VideoContainer>
              <VideoPlayer
                src={video.video_url}
                totalDuration={video.duration}
                isTheatreMode={isTheatreMode}
                setIsTheatreMode={setIsTheatreMode}
              />
            </VideoContainer>
            <VideoDetailsWrapper>
              <VideoDetailsContainer>
                <VideoPageHeader video={video} />
                <VideoPageDescription video={video} />
                <CommentSectionProvider>
                  {video && <CommentSection video={video} />}
                </CommentSectionProvider>
              </VideoDetailsContainer>
              {isTheatreMode && video.user_id && (
                <SuggestionsSideBar video={video} isTheatreMode={isTheatreMode} />
              )}
            </VideoDetailsWrapper>
          </VideoColumn>
          {!isTheatreMode && video.user_id && (
            <SuggestionsSideBar video={video} isTheatreMode={isTheatreMode} />
          )}
        </VideoPageContainer>
      )}
    </Layout>
  );
};

export default VideoPage;
