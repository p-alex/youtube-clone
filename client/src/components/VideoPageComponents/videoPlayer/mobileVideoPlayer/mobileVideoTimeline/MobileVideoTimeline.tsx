import React, { useEffect, useRef, useState } from 'react';
import {
  MobileVideoTimeline__Container,
  MobileVideoTimeline__ProgressBar,
  MobileVideoTimeline__ProgressBarCircle,
  MobileVideoTimeline__Timeline,
} from './MobileVideoTimeline.styles';

const MobileVideoTimeline = ({
  videoRef,
  isPlaying,
  setIsPlaying,
  showControls,
  currentTime,
  setCurrentTime,
  totalDuration,
  handleSetNewTime,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  showControls: boolean;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  totalDuration: number;
  handleSetNewTime: (newTime: number) => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [canControlTimeline, setCanControlTimeline] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);

  const wasPlaying = useRef(false);

  const handleUpdateTimeline = () => {
    const percent = (currentTime / totalDuration) * 100;
    setProgress(percent);
  };

  const handleCalculatePercent = (pageX: number) => {
    const rect = timelineRef.current!.getBoundingClientRect();
    let percent = ((pageX - rect.x) / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    return percent;
  };

  const handleStartMove = (startPos: number) => {
    wasPlaying.current = isPlaying;
    setCanControlTimeline(true);
    const percent = handleCalculatePercent(startPos);
    setProgress(percent);
  };

  const handleMoving = (currentPos: number) => {
    if (!canControlTimeline) return;
    const pageX = currentPos;
    const percent = handleCalculatePercent(pageX);
    setProgress(percent);
    setCurrentTime((percent / 100) * totalDuration);
  };

  const handleDocumentMouseMove = (event: MouseEvent) => {
    handleMoving(event.pageX);
  };

  const handleDocumentTouchMove = (event: TouchEvent) => {
    handleMoving(event.touches[0].pageX);
  };

  const handleDocumentMouseUp = () => {
    if (!canControlTimeline) return;
    setCanControlTimeline(false);
    handleSetNewTime((progress / 100) * totalDuration);
    videoRef.current!.currentTime = (progress / 100) * totalDuration;
    if (progress === 100) return setIsPlaying(false);
    if (wasPlaying.current) setIsPlaying(true);
  };

  useEffect(() => {
    if (canControlTimeline) return;
    handleUpdateTimeline();
  }, [currentTime]);

  useEffect(() => {
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('touchend', handleDocumentMouseUp);
    document.addEventListener('touchmove', handleDocumentTouchMove);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('touchend', handleDocumentMouseUp);
      document.removeEventListener('touchmove', handleDocumentTouchMove);
    };
  });

  return (
    <MobileVideoTimeline__Container
      canInteract={showControls}
      onMouseDown={(e) => handleStartMove(e.pageX)}
      onTouchStart={(e) => handleStartMove(e.touches[0].pageX)}
    >
      <MobileVideoTimeline__Timeline ref={timelineRef}>
        <MobileVideoTimeline__ProgressBar style={{ width: `${progress}%` }}>
          <MobileVideoTimeline__ProgressBarCircle></MobileVideoTimeline__ProgressBarCircle>
        </MobileVideoTimeline__ProgressBar>
      </MobileVideoTimeline__Timeline>
    </MobileVideoTimeline__Container>
  );
};

export default MobileVideoTimeline;
