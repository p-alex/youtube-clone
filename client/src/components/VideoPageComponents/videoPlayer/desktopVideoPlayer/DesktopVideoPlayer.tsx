import React, { useRef, useState } from 'react';
import { VideoInfo } from '../../../../app/features/videoSlice';
import VideoDesktopControls from './DesktopVideoControls/DesktopVideoControls';
import {
  DesktopVideoPlayer__Container,
  DesktopVideoPlayer__Title,
  DesktopVideoPlayer__TitleContainer,
  DesktopVideoPlayer__Video,
} from './DesktopVideoPlayer.styles';

let timeoutHideCursorAndControls: NodeJS.Timeout | null = null;

const DesktopVideoPlayer = ({
  video,
  isTheatreMode,
  setIsTheatreMode,
}: {
  video: VideoInfo;
  isTheatreMode: boolean;
  setIsTheatreMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showControls, setShowControls] = useState(true);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoContainerMouseMove = () => {
    clearTimeout(timeoutHideCursorAndControls!);
    if (!isPlaying) return;
    setShowControls(true);
    timeoutHideCursorAndControls = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleVideoContainerMouseOut = () => {
    clearTimeout(timeoutHideCursorAndControls!);
    if (!isPlaying) return;
    setShowControls(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current!.currentTime);
  };

  const { video_url, title, thumbnail_url, duration } = video;

  return (
    <DesktopVideoPlayer__Container
      ref={videoContainerRef}
      onMouseMove={handleVideoContainerMouseMove}
      onMouseOut={handleVideoContainerMouseOut}
      showCursor={showControls}
      isTheatreMode={isTheatreMode}
    >
      {isFullscreen && showControls && (
        <DesktopVideoPlayer__TitleContainer>
          <DesktopVideoPlayer__Title>{title}</DesktopVideoPlayer__Title>
        </DesktopVideoPlayer__TitleContainer>
      )}
      <DesktopVideoPlayer__Video
        src={video_url}
        poster={thumbnail_url}
        ref={videoRef}
        isTheatreMode={isTheatreMode}
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        controlsList="nodownload"
      />
      <VideoDesktopControls
        videoContainerRef={videoContainerRef}
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        showControls={showControls}
        setShowControls={setShowControls}
        totalDuration={duration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        timeoutHideCursorAndControls={timeoutHideCursorAndControls}
        isTheatreMode={isTheatreMode}
        setIsTheatreMode={setIsTheatreMode}
        isFullscreen={isFullscreen}
        handleToggleFullscreen={handleToggleFullscreen}
      />
    </DesktopVideoPlayer__Container>
  );
};

export default DesktopVideoPlayer;
