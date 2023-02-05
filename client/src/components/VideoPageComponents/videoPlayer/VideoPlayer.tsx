import React, { SetStateAction, useEffect, useState } from 'react';
import { VideoInfo } from '../../../app/features/videoSlice';
import { MOBILE_BREAK_POINT } from '../../../layout/style';
import DesktopVideoPlayer from './DesktopVideoPlayer/DesktopVideoPlayer';
import MobileVideoPlayer from './MobileVideoPlayer/MobileVideoPlayer';
import { VideoPlayer__Container } from './VideoPlayer.styles';

const VideoPlayer = ({
  video,
  isTheatreMode,
  setIsTheatreMode,
}: {
  video: VideoInfo;
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
              video={video}
              isTheatreMode={isTheatreMode}
              setIsTheatreMode={setIsTheatreMode}
            />
          ) : (
            <MobileVideoPlayer video={video} />
          )}
        </>
      )}
    </VideoPlayer__Container>
  );
};

export default VideoPlayer;
