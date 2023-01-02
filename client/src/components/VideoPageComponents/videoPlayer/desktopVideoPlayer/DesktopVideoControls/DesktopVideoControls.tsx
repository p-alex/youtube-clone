import React, { useEffect, useState } from 'react';
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPause,
  MdPlayArrow,
  MdReplay,
  MdVolumeDown,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { videoDurationFormatter } from '../../../../../utils/videoDurationFormatter';
import DesktopVideoTimeline from '../DesktopVideoTimeline/DesktopVideoTimeline';
import {
  DesktopVideoControls__Container,
  DesktopVideoControls__Control,
  DesktopVideoControls__DurationContainer,
  DesktopVideoControls__TheatreIcon,
  DesktopVideoControls__VolumeContainer,
  DesktopVideoControls__VolumeSlider,
} from './DesktopVideoControls.styles';

const VideoDesktopControls = ({
  videoContainerRef,
  videoRef,
  isPlaying,
  setIsPlaying,
  isTheatreMode,
  setIsTheatreMode,
  showControls,
  setShowControls,
  timeoutHideCursorAndControls,
  currentTime,
  setCurrentTime,
  totalDuration,
}: {
  videoContainerRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isTheatreMode: boolean;
  setIsTheatreMode: React.Dispatch<React.SetStateAction<boolean>>;
  showControls: boolean;
  setShowControls: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutHideCursorAndControls: NodeJS.Timeout | null;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  totalDuration: number;
}) => {
  const canUseKeyBinds = useSelector(
    (state: RootState) => state.video.canUseVideoKeyBinds
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(1);
  const [volumeLevel, setVolumeLevel] = useState<'high' | 'low' | 'muted'>('high');

  const handleKeyPress = (event: KeyboardEvent) => {
    if (canUseKeyBinds) {
      switch (event.key.toLocaleLowerCase()) {
        case 'k':
          handleTogglePlay();
          break;
        case 'm':
          handleToggleMute();
          break;
        case 't':
          handleToggleTheatreMode();
          break;
        case 'f':
          handleToggleFullscreen();
          break;
      }
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    if (isPlaying) {
      videoRef.current!.play();
    } else {
      videoRef.current!.pause();
      setShowControls(true);
    }
  }, [isPlaying]);

  const handleToggleTheatreMode = () => {
    setIsTheatreMode((prevState) => !prevState);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isFullscreen) {
      videoContainerRef.current!.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  useEffect(() => {
    videoRef.current!.muted = isMuted;
  }, [isMuted]);

  const handleToggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  useEffect(() => {
    videoRef.current!.volume = volume;
    if (volume === 0) {
      setVolumeLevel('muted');
    } else if (volume > 0.5) {
      setVolumeLevel('high');
    } else {
      setVolumeLevel('low');
    }
  }, [volume]);

  const handleMouseOverVideoControls = () => {
    clearTimeout(timeoutHideCursorAndControls!);
    setShowControls(true);
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [canUseKeyBinds]);

  return (
    <DesktopVideoControls__Container
      showControls={showControls}
      onMouseMove={handleMouseOverVideoControls}
    >
      <DesktopVideoTimeline
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        videoRef={videoRef}
        totalDuration={totalDuration}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <DesktopVideoControls__Control
        type={'button'}
        onClick={handleTogglePlay}
        title={
          isPlaying
            ? 'Pause'
            : !isPlaying && currentTime !== totalDuration
            ? 'Play'
            : 'Replay'
        }
      >
        {isPlaying && <MdPause />}
        {!isPlaying && currentTime !== totalDuration && <MdPlayArrow />}
        {!isPlaying && currentTime === totalDuration && <MdReplay />}
      </DesktopVideoControls__Control>
      <DesktopVideoControls__VolumeContainer>
        <DesktopVideoControls__Control
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {!isMuted && volumeLevel === 'high' && <MdVolumeUp />}
          {!isMuted && volumeLevel === 'low' && <MdVolumeDown />}
          {(isMuted || volumeLevel === 'muted') && <MdVolumeOff />}
        </DesktopVideoControls__Control>
        <DesktopVideoControls__VolumeSlider
          type="range"
          min="0"
          max="1"
          step="any"
          value={volume}
          onChange={handleChangeVolume}
        />
      </DesktopVideoControls__VolumeContainer>
      <DesktopVideoControls__DurationContainer>
        {videoDurationFormatter(currentTime)} / {videoDurationFormatter(totalDuration)}
      </DesktopVideoControls__DurationContainer>
      <DesktopVideoControls__Control
        title={'Theatre mode'}
        onClick={handleToggleTheatreMode}
      >
        <DesktopVideoControls__TheatreIcon className={isTheatreMode ? 'active' : ''} />
      </DesktopVideoControls__Control>
      <DesktopVideoControls__Control
        type={'button'}
        onClick={handleToggleFullscreen}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
      </DesktopVideoControls__Control>
    </DesktopVideoControls__Container>
  );
};

export default VideoDesktopControls;
