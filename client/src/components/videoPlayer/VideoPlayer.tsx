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

  // useEffect(() => {
  //   //@ts-ignore
  //   if (window.navigator.userAgentData.mobile) {
  //     setVideoPlayerType('mobile');
  //   } else {
  //     setVideoPlayerType('desktop');
  //   }
  // }, []);

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
