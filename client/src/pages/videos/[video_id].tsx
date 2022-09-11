import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import styled from "styled-components";
import VideoComments from "../../components/videoComments/VideoComments";
import SuggestionCard from "../../components/suggestionCard/SuggestionCard";
import VideoDetails from "../../components/videoDetails/VideoDetails";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {
  CONTAINER_HORIZONTAL_PADDING,
  MOBILE_BREAK_POINT,
  NAV_BAR_HEIGHT,
} from "../../layout/style";
import Head from "next/head";
import ToggleMobileComments from "../../components/toggleMobileComments/ToggleMobileComments";
import VideoCommentsMobile from "../../components/videoCommentsMobile/VideoCommentsMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { AnimatePresence } from "framer-motion";
import { videos } from "../../utils/videosList";
import { useRouter } from "next/router";
import { setVideo, VideoInfo } from "../../app/features/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useMobileSize from "../../hooks/useMobileSize";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";

const Container = styled.main`
  position: relative;
  display: flex;
  margin: ${NAV_BAR_HEIGHT}px auto;
  gap: 20px;
  max-width: 1850px;
  padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0px;
    gap: 0px;
  }
`;

const VideoColumn = styled.div`
  position: relative;
  width: 100%;
`;

const VideoContainer = styled.div`
  position: relative;
  grid-area: video;
  z-index: 20;
`;

const VideoDetailsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const VideoDetailsContainer = styled.div`
  position: relative;
  grid-area: video_details;
  width: 100%;
`;

const SuggestionsColumn = styled.aside<{ isTheatreMode: boolean }>`
  width: 371px;
  grid-area: suggestions;
  margin-top: ${(props) => (props.isTheatreMode ? "20px" : "0")};
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    margin: auto;
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
`;

const VideoPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const video = useSelector((state: RootState) => state.video.videoInfo);
  const dispatch = useDispatch();
  const [videoPlayerType, setVideoPlayerType] = useState<
    "desktop" | "mobile" | ""
  >("");
  const isMobileSize = useMobileSize();
  const { query } = useRouter();

  const effectRan = useRef(false);

  const [getVideo, { isLoading, errors }] = useAxiosWithRetry<{
    video: VideoInfo;
  }>(`api/videos/${query.video_id}`, { accessToken: auth.accessToken! });

  const handleGetVideo = async () => {
    const response = await getVideo();
    if (response.result) {
      dispatch(setVideo(response.result.video));
    }
  };

  useEffect(() => {
    if (effectRan.current || !auth.accessToken || !query.video_id) return;
    handleGetVideo();
    return () => {
      effectRan.current = true;
    };
  }, [query, auth]);

  useEffect(() => {
    setIsTheatreMode(false);
    if (isMobileSize && !videoPlayerType) {
      setVideoPlayerType("mobile");
    } else if (!isMobileSize && !videoPlayerType) {
      setVideoPlayerType("desktop");
    }
  }, [isMobileSize]);

  const [isMobileCommentsActive, setIsMobileCommentsActive] = useState(false);

  const isWindowWidthUnder = useWindowSize({ width: 600, initialValue: true });

  const [isTheatreMode, setIsTheatreMode] = useState(false);

  const handleToggleMobileComments = () => {
    setIsMobileCommentsActive((prevState) => !prevState);
  };

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
      <Container className={isTheatreMode ? "theatre-mode" : ""}>
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
              <VideoDetails video={video} />
              {isWindowWidthUnder && (
                <ToggleMobileComments
                  total_comments={video.total_comments}
                  handleToggleMobileComments={handleToggleMobileComments}
                />
              )}
              <AnimatePresence>
                {isMobileCommentsActive && isWindowWidthUnder && (
                  <VideoCommentsMobile
                    video={video}
                    handleToggleMobileComments={handleToggleMobileComments}
                  />
                )}
              </AnimatePresence>
              {!isWindowWidthUnder && video.video_id && (
                <VideoComments video={video} />
              )}
            </VideoDetailsContainer>
            {isTheatreMode && (
              <SuggestionsColumn isTheatreMode={isTheatreMode}>
                {videos.map((video, index) => {
                  return <SuggestionCard key={index} video={video} />;
                })}
              </SuggestionsColumn>
            )}
          </VideoDetailsWrapper>
        </VideoColumn>
        {!isTheatreMode && (
          <SuggestionsColumn isTheatreMode={false}>
            {videos.map((video, index) => {
              return <SuggestionCard key={index} video={video} />;
            })}
          </SuggestionsColumn>
        )}
      </Container>
    </Layout>
  );
};

export default VideoPage;
