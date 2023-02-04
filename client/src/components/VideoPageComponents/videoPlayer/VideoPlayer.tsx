import React, { SetStateAction, useEffect, useState } from 'react';
import { MOBILE_BREAK_POINT } from '../../../layout/style';
import DesktopVideoPlayer from './DesktopVideoPlayer/DesktopVideoPlayer';
import MobileVideoPlayer from './MobileVideoPlayer/MobileVideoPlayer';
import { VideoPlayer__Container } from './VideoPlayer.styles';

const VideoPlayer = ({
  src,
  thumbnail_url,
  totalDuration,
  isTheatreMode,
  setIsTheatreMode,
}: {
  src: string;
  thumbnail_url: string;
  totalDuration: number;
  isTheatreMode: boolean;
  setIsTheatreMode: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [initialWindowWidth, setInitialWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setInitialWindowWidth(window.innerWidth);
  }, []);

  return (
    <VideoPlayer__Container isTheatreMode={isTheatreMode}>
      {initialWindowWidth !== null && (
        <>
          {initialWindowWidth > MOBILE_BREAK_POINT ? (
            <DesktopVideoPlayer
              src={src}
              thumbnail_url={thumbnail_url}
              totalDuration={totalDuration}
              isTheatreMode={isTheatreMode}
              setIsTheatreMode={setIsTheatreMode}
            />
          ) : (
            <MobileVideoPlayer
              src={src}
              totalDuration={totalDuration}
              thumbnail_url={thumbnail_url}
            />
          )}
        </>
      )}
    </VideoPlayer__Container>
  );
};

export default VideoPlayer;
