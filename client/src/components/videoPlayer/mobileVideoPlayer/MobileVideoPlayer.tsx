import React, { useRef, useState } from 'react';
import MobileVideoControls from './mobileVideoControls/MobileVideoControls';
import { Container, Video } from './style';

const MobileVideoPlayer = ({
  src,
  totalDuration,
}: {
  src: string;
  totalDuration: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current!.currentTime);
  };

  const handleSetNewTime = (newTime: number) => {
    videoRef.current!.currentTime = newTime;
  };

  return (
    <Container ref={videoContainerRef} hideOverflow={!showControls}>
      <Video src={src} ref={videoRef} onTimeUpdate={handleTimeUpdate} />
      <MobileVideoControls
        videoContainerRef={videoContainerRef}
        videoRef={videoRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        showControls={showControls}
        setShowControls={setShowControls}
        totalDuration={totalDuration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        handleSetNewTime={handleSetNewTime}
      />
    </Container>
  );
};

export default MobileVideoPlayer;
