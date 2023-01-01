import React, { useEffect, useRef, useState } from 'react';
import { Timeline, PreviewBar, ProgressBar, Slider } from './style';

const VideoTimeline = ({
  videoRef,
  currentTime,
  setCurrentTime,
  totalDuration,
  isPlaying,
  setIsPlaying,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  totalDuration: number;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [previewBarPercentage, setPreviewBarPercentage] = useState(0);
  const [progressBarPercentage, setProgressBarPercentage] = useState(
    (currentTime / totalDuration) * 100
  );
  const [canControlPreviewBar, setCanControlPreviewBar] = useState(false);
  const [canControlProgressBar, setCanControlProgressBar] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const previewBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const wasPlaying = useRef<boolean>(false);

  const sliderUpdate = () => {
    setProgressBarPercentage((currentTime / totalDuration) * 100);
    if (currentTime === totalDuration) setIsPlaying(false);
  };

  useEffect(() => {
    if (canControlProgressBar) return;
    sliderUpdate();
  }, [currentTime]);

  useEffect(() => {
    if (canControlProgressBar) {
      timelineRef.current!.classList.add('active');
      sliderRef.current!.classList.add('active');
      return;
    }
    timelineRef.current!.classList.remove('active');
    sliderRef.current!.classList.remove('active');
  }, [canControlProgressBar]);

  const mouseDownSlider = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCanControlProgressBar(true);
    setCanControlPreviewBar(false);
    wasPlaying.current = isPlaying;
    setIsPlaying(false);
    const percent = calculatePercentage(event);
    setProgressBarPercentage(percent);
  };

  const mouseOverSlider = () => {
    setCanControlPreviewBar(true);
  };

  const mouseLeaveSlider = () => {
    setPreviewBarPercentage(0);
  };

  const mouseMoveUpdatePreviewBar = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const percent = calculatePercentage(event);
    if (canControlPreviewBar) setPreviewBarPercentage(percent);
    if (canControlProgressBar) setProgressBarPercentage(percent);
  };

  const calculatePercentage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    const rect = sliderRef.current!.getBoundingClientRect();
    let percent = ((event.pageX - rect.x) / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    return percent;
  };

  const documentMouseUp = () => {
    if (!canControlProgressBar) return;
    setCanControlProgressBar(false);
    videoRef.current!.currentTime = (progressBarPercentage / 100) * totalDuration;
    if (progressBarPercentage === 100) return setIsPlaying(false);
    if (wasPlaying.current) setIsPlaying(true);
  };

  const documentMouseMove = (event: MouseEvent) => {
    if (!canControlProgressBar) return;
    let percent = calculatePercentage(event);
    setProgressBarPercentage(percent);
    setCurrentTime((percent / 100) * totalDuration);
    setCanControlPreviewBar(true);
  };

  useEffect(() => {
    document.addEventListener('mouseup', documentMouseUp);
    document.addEventListener('mousemove', documentMouseMove);
    return () => {
      document.removeEventListener('mouseup', documentMouseUp);
      document.removeEventListener('mousemove', documentMouseMove);
    };
  });

  return (
    <Timeline ref={timelineRef}>
      <Slider
        onMouseOver={mouseOverSlider}
        onMouseLeave={mouseLeaveSlider}
        onMouseDown={mouseDownSlider}
        onMouseMove={mouseMoveUpdatePreviewBar}
        ref={sliderRef}
      >
        <PreviewBar
          style={{ width: `${previewBarPercentage}%` }}
          ref={previewBarRef}
        ></PreviewBar>
        <ProgressBar
          style={{ width: `${progressBarPercentage}%` }}
          ref={progressBarRef}
        ></ProgressBar>
      </Slider>
    </Timeline>
  );
};

export default VideoTimeline;
