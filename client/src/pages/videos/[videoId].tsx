import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/Layout";
import SuggestionCard from "../../components/suggestionCard/SuggestionCard";
import VideoDetails from "../../components/videoDetails/VideoDetails";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import Head from "next/head";
import { videos } from "../../utils/videosList";
import { useRouter } from "next/router";
import { resetVideo, setVideo, VideoInfo } from "../../app/features/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useMobileSize from "../../hooks/useMobileSize";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import useAxiosWithRetry from "../../hooks/useAxiosWithRetry";
import CommentSection from "../../containers/CommentSection/CommentSection";
import { CommentSectionProvider } from "../../context/CommentSectionContext/CommentSectionProvider";
import {
  SuggestionsColumn,
  VideoColumn,
  VideoContainer,
  VideoDetailsContainer,
  VideoDetailsWrapper,
  VideoPageContainer,
} from "../../pageStyles/VideoPage.styles";

const VideoPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const video = useSelector((state: RootState) => state.video.videoInfo);
  const dispatch = useDispatch();
  const [videoPlayerType, setVideoPlayerType] = useState<
    "desktop" | "mobile" | ""
  >("");
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const isMobileSize = useMobileSize();
  const videoId = useRouter().query.videoId;

  const effectRan = useRef(false);

  const [getVideo, { isLoading, errors }] = useAxiosWithRetry<
    {},
    { video: VideoInfo }
  >(`api/videos/${videoId}`);

  const handleGetVideo = async () => {
    const response = await getVideo({});
    if (response.result) {
      dispatch(setVideo(response.result.video));
    }
  };

  useEffect(() => {
    if (effectRan.current || !auth.accessToken || !videoId) return;
    handleGetVideo();
    return () => {
      effectRan.current = true;
    };
  }, [videoId, auth]);

  useEffect(() => {
    setIsTheatreMode(false);
    if (isMobileSize && !videoPlayerType) {
      setVideoPlayerType("mobile");
    } else if (!isMobileSize && !videoPlayerType) {
      setVideoPlayerType("desktop");
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
        <VideoPageContainer className={isTheatreMode ? "theatre-mode" : ""}>
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
                <CommentSectionProvider>
                  {video && <CommentSection video={video} />}
                </CommentSectionProvider>
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
        </VideoPageContainer>
      )}
    </Layout>
  );
};

export default VideoPage;
