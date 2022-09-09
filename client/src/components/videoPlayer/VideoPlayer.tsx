import React, { SetStateAction, useEffect, useState } from 'react';
import DesktopVideoPlayer from './desktopVideoPlayer/DesktopVideoPlayer';
import MobileVideoPlayer from './mobileVideoPlayer/MobileVideoPlayer';

const VideoPlayer = ({
  src,
  totalDuration,
  isTheatreMode,
  setIsTheatreMode,
}: {
  src: string;
  totalDuration: number;
  isTheatreMode: boolean;
  setIsTheatreMode: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [videoPlayerType, setVideoPlayerType] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    if (window.innerWidth <= 980) setVideoPlayerType('mobile');
  }, []);

  return (
    <>
      {videoPlayerType === 'desktop' && (
        <DesktopVideoPlayer
          src={src}
          totalDuration={totalDuration}
          isTheatreMode={isTheatreMode}
          setIsTheatreMode={setIsTheatreMode}
        />
      )}
      {videoPlayerType === 'mobile' && (
        <MobileVideoPlayer src={src} totalDuration={totalDuration} />
      )}
    </>
  );
};

export default VideoPlayer;
