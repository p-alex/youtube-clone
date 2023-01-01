import React, { useRef, useState, useEffect } from 'react';
import { Video, VideoContainer } from './style';
import VideoDesktopControls from './videoControls/VideoControls';

let timeoutHideCursorAndControls: NodeJS.Timeout | null = null;

const DesktopVideoPlayer = ({
  src,
  totalDuration,
  isTheatreMode,
  setIsTheatreMode,
}: {
  src: string;
  totalDuration: number;
  isTheatreMode: boolean;
  setIsTheatreMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  return (
    <VideoContainer
      ref={videoContainerRef}
      onMouseMove={handleVideoContainerMouseMove}
      onMouseOut={handleVideoContainerMouseOut}
      showCursor={showControls}
      isTheatreMode={isTheatreMode}
    >
      <Video
        src={src}
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
        totalDuration={totalDuration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        timeoutHideCursorAndControls={timeoutHideCursorAndControls}
        isTheatreMode={isTheatreMode}
        setIsTheatreMode={setIsTheatreMode}
      />
    </VideoContainer>
  );
};

export default DesktopVideoPlayer;
