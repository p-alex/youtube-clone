import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import { useRouter } from 'next/router';
import { resetVideo, setVideo, VideoInfo } from '../../app/features/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import useMobileSize from '../../hooks/screenSizeHooks/useMobileSize';
import useAxiosWithRetry from '../../hooks/requestHooks/useAxiosWithRetry';
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
import PageContainer from '../../containers/PageContainer/PageContainer';

const VideoPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const video: VideoInfo = useSelector((state: RootState) => state.video.videoInfo);
  const [videoPlayerType, setVideoPlayerType] = useState<'desktop' | 'mobile' | ''>('');
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const isMobileSize = useMobileSize();
  const videoId = useRouter().query.videoId;

  const [getVideo, { isLoading, errors }] = useAxiosWithRetry<
    { videoId: string; userId: string },
    { video: VideoInfo }
  >(`api/videos/${videoId}`, 'POST');

  const handleGetVideo = async () => {
    const response = await getVideo({
      videoId: videoId as string,
      userId: auth.user.user_id,
    });
    if (response.result) {
      dispatch(setVideo(response.result.video));
    }
  };

  useEffect(() => {
    if (!videoId || auth.isGettingUser) return;
    handleGetVideo();
  }, [videoId, auth.isGettingUser]);

  useEffect(() => {
    setIsTheatreMode(false);
    if (isMobileSize && !videoPlayerType) {
      setVideoPlayerType('mobile');
    } else if (!isMobileSize && !videoPlayerType) {
      setVideoPlayerType('desktop');
    }
  }, [isMobileSize]);

  useEffect(() => {
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
