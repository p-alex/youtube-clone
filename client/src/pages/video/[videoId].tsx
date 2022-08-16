import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import styled from 'styled-components';
import VideoComments from '../../components/videoComments/VideoComments';
import SuggestionCard from '../../components/suggestionCard/SuggestionCard';
import VideoDetails from '../../components/videoDetails/VideoDetails';
import VideoHeader from '../../components/videoHeader/VideoHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  CONTAINER_HORIZONTAL_PADDING,
  MOBILE_BREAK_POINT,
  NAV_BAR_HEIGHT,
} from '../../layout/style';
import Head from 'next/head';
import ToggleMobileComments from '../../components/toggleMobileComments/ToggleMobileComments';
import VideoCommentsMobile from '../../components/videoCommentsMobile/VideoCommentsMobile';
import useWindowSize from '../../hooks/useWindowSize';
import { AnimatePresence } from 'framer-motion';

const Container = styled.main`
  position: relative;
  display: flex;
  margin: ${NAV_BAR_HEIGHT}px auto;
  width: 100%;
  max-width: 1700px;
  gap: 20px;
  padding: 20px ${CONTAINER_HORIZONTAL_PADDING}px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    flex-direction: column;
    padding: 0px;
  }
`;

const MainColumn = styled.div`
  position: relative;
  width: 100%;
`;
const Video = styled.video`
  position: relative;
  width: 100%;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    position: sticky;
    top: ${NAV_BAR_HEIGHT}px;
    z-index: 50;
  }
`;

const SuggestionsColumn = styled.aside`
  width: 550px;
  @media (max-width: ${MOBILE_BREAK_POINT}px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    width: 100%;
    margin: auto;
    padding: 0 ${CONTAINER_HORIZONTAL_PADDING}px;
  }
  @media (max-width: 577px) {
    padding: 0;
  }
`;

const VideoPage = () => {
  const videos = useSelector((state: RootState) => state.video.videos);
  const [isMobileCommentsActive, setIsMobileCommentsActive] = useState(false);

  const isWindowWidthUnder = useWindowSize({ width: 600, initialValue: true });

  const handleToggleMobileComments = () => {
    setIsMobileCommentsActive((prevState) => !prevState);
  };
  return (
    <Layout>
      <Head>
        <title>AlexTube Video</title>
        <meta
          name="description"
          content="AlexTube is a video sharing app created by Alexandru Daniel Pistol"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <MainColumn>
          <Video controls>
            <source src="/videos/sample.mp4" type="video/mp4" />
          </Video>
          <VideoHeader />
          <VideoDetails />
          {isWindowWidthUnder && (
            <ToggleMobileComments
              handleToggleMobileComments={handleToggleMobileComments}
            />
          )}
          <AnimatePresence>
            {isMobileCommentsActive && isWindowWidthUnder && (
              <VideoCommentsMobile
                handleToggleMobileComments={handleToggleMobileComments}
              />
            )}
          </AnimatePresence>

          {!isWindowWidthUnder && <VideoComments />}
        </MainColumn>
        <SuggestionsColumn>
          {videos.map((video, index) => {
            return <SuggestionCard key={index} video={video} />;
          })}
        </SuggestionsColumn>
      </Container>
    </Layout>
  );
};

export default VideoPage;
