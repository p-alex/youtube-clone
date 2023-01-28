import React, { SetStateAction, useEffect, useState } from 'react';
import { MOBILE_BREAK_POINT } from '../../../layout/style';
import DesktopVideoPlayer from './DesktopVideoPlayer/DesktopVideoPlayer';
import MobileVideoPlayer from './MobileVideoPlayer/MobileVideoPlayer';
import { VideoPlayer__Container } from './VideoPlayer.styles';

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
    <VideoPlayer__Container isTheatreMode={isTheatreMode}>
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
    </VideoPlayer__Container>
  );
};

export default VideoPlayer;
