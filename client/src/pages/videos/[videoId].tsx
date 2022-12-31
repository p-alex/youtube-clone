import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../layout/Layout';
import VideoHeader from '../../components/videoHeader/VideoHeader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { resetVideo, setVideo, VideoInfo } from '../../app/features/videoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import useMobileSize from '../../hooks/screenSizeHooks/useMobileSize';
import VideoPlayer from '../../components/videoPlayer/VideoPlayer';
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
import VideoDescription from '../../components/videoDescription/VideoDescription';
import SuggestionsSideBar from '../../components/SuggestionsSideBar/SuggestionsSideBar';

const VideoPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const video: VideoInfo = useSelector((state: RootState) => state.video.videoInfo);
  const [videoPlayerType, setVideoPlayerType] = useState<'desktop' | 'mobile' | ''>('');
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const isMobileSize = useMobileSize();
  const videoId = useRouter().query.videoId;

  const effectRan = useRef(false);

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
    if (!videoId || effectRan.current === true) return;
    handleGetVideo();
    return () => {
      if (videoId) {
        effectRan.current = true;
      }
    };
  }, [videoId]);

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
    <Layout>
      <Head>
        <title>{video.title}</title>
        <meta
          name="description"
          content="AlexTube is a video sharing app created by Alexandru Daniel Pistol"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                <VideoHeader video={video} />
                <VideoDescription video={video} />
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
