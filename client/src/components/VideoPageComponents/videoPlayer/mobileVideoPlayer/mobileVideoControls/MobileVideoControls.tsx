import React, { useEffect } from 'react';
import {
  MdPlayArrow,
  MdReplay10,
  MdForward10,
  MdFullscreen,
  MdPause,
  MdFullscreenExit,
  MdReplay,
} from 'react-icons/md';
import { videoDurationFormatter } from '../../../../../utils/videoDurationFormatter';

import MobileVideoTimeline from '../mobileVideoTimeline/MobileVideoTimeline';
import {
  BackDrop,
  BigControls,
  BottomContainer,
  Container,
  Control,
  Duration,
  PlayAndSkipControls,
} from './style';

let timeoutHideControls: NodeJS.Timeout | undefined;

const MobileVideoControls = ({
  videoContainerRef,
  videoRef,
  isPlaying,
  setIsPlaying,
  isFullscreen,
  setIsFullscreen,
  showControls,
  setShowControls,
  currentTime,
  setCurrentTime,
  totalDuration,
  handleSetNewTime,
}: {
  videoContainerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  showControls: boolean;
  setShowControls: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  totalDuration: number;
  handleSetNewTime: (newTime: number) => void;
}) => {
  const handleTogglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleRestartTimeout = () => {
    timeoutHideControls = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
      handleRestartTimeout();
    } else {
      videoRef.current?.pause();
      clearTimeout(timeoutHideControls);
    }
  }, [isPlaying]);

  const handleSkip = (time: number) => {
    videoRef.current!.currentTime += time;
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isFullscreen) {
      videoContainerRef.current!.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  const handleToggleShowControls = () => {
    clearTimeout(timeoutHideControls);
    setShowControls((prevState) => !prevState);
  };

  const handleUpdateTime = () => {
    setCurrentTime(videoRef.current!.currentTime);
  };

  useEffect(() => {
    const video = videoRef.current!;
    video.addEventListener('timeupdate', handleUpdateTime);
    return () => {
      video.removeEventListener('timeupdate', handleUpdateTime);
    };
  }, []);

  return (
    <Container showControls={showControls}>
      <BackDrop onClick={handleToggleShowControls} />
      <PlayAndSkipControls disableClick={!showControls}>
        <BigControls onClick={() => handleSkip(-10)}>
          <MdReplay10 />
        </BigControls>

        <BigControls onClick={handleTogglePlay}>
          {isPlaying && <MdPause />}
          {!isPlaying && currentTime !== totalDuration && <MdPlayArrow />}
          {!isPlaying && currentTime === totalDuration && <MdReplay />}
        </BigControls>

        <BigControls onClick={() => handleSkip(10)}>
          <MdForward10 />
        </BigControls>
      </PlayAndSkipControls>
      <BottomContainer>
        <Duration>
          {videoDurationFormatter(currentTime)} / {videoDurationFormatter(totalDuration)}
        </Duration>
        <Control onClick={handleToggleFullscreen}>
          {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
        </Control>
      </BottomContainer>
      <MobileVideoTimeline
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        showControls={showControls}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        totalDuration={totalDuration}
        handleSetNewTime={handleSetNewTime}
      />
    </Container>
  );
};

export default MobileVideoControls;
