import React, { SetStateAction, useEffect, useState } from 'react';
import { MOBILE_BREAK_POINT } from '../../../layout/style';
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
  const [showMobileVideoPlayer, setShowMobileVideoPlayer] = useState<boolean>(true);

  useEffect(() => {
    setShowMobileVideoPlayer(window.innerWidth <= MOBILE_BREAK_POINT);
  }, []);

  return (
    <>
      {!showMobileVideoPlayer ? (
        <DesktopVideoPlayer
          src={src}
          totalDuration={totalDuration}
          isTheatreMode={isTheatreMode}
          setIsTheatreMode={setIsTheatreMode}
        />
      ) : (
        <MobileVideoPlayer src={src} totalDuration={totalDuration} />
      )}
    </>
  );
};

export default VideoPlayer;
