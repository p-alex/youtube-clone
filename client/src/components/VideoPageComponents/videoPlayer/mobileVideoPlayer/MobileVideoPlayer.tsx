import React, { useRef, useState } from 'react';
import MobileVideoControls from './MobileVideoControls/MobileVideoControls';
import {
  MobileVideoPlayer__Container,
  MobileVideoPlayer__Video,
} from './MobileVideoPlayer.styles';

const MobileVideoPlayer = ({
  src,
  totalDuration,
}: {
  src: string;
  totalDuration: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current!.currentTime);
  };

  const handleSetNewTime = (newTime: number) => {
    videoRef.current!.currentTime = newTime;
  };

  return (
    <MobileVideoPlayer__Container ref={videoContainerRef} hideOverflow={!showControls}>
      <MobileVideoPlayer__Video
        src={src}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      />
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
    </MobileVideoPlayer__Container>
  );
};

export default MobileVideoPlayer;
