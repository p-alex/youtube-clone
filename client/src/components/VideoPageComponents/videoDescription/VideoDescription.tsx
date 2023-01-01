import { useState, useEffect, useRef } from 'react';
import { VideoInfo } from '../../../app/features/videoSlice';
import { dateConverter } from '../../../utils/dateConverter';

import {
  VideoDescriptionContainer,
  VideoDescriptionShowMoreBtn,
  VideoDescriptionStats,
  VideoDescriptionText,
} from './VideoDescription.styles';

const VideoDescription = ({ video }: { video: VideoInfo }) => {
  const [showMoreText, setShowMoreText] = useState<boolean | null>(null);
  const created_at = useRef(dateConverter(new Date(video.created_at).getTime()));
  useEffect(() => {
    const replyText = document.getElementById(`videoDescription`) as HTMLParagraphElement;
    const maxLines = 4;
    const lineHeight = 20;
    if (replyText.offsetHeight > maxLines * lineHeight) {
      setShowMoreText(false);
    } else {
      setShowMoreText(null);
    }
  }, []);
  return (
    <VideoDescriptionContainer
      showMoreText={showMoreText}
      onClick={
        showMoreText
          ? () => {}
          : showMoreText === false
          ? () => setShowMoreText((prevState) => !prevState)
          : () => {}
      }
    >
      <VideoDescriptionStats>
        <span>{video.views} views</span>•<span>{created_at.current}</span>
      </VideoDescriptionStats>
      <VideoDescriptionText showMoreText={showMoreText} id={'videoDescription'}>
        {video.description}{' '}
      </VideoDescriptionText>
      {showMoreText !== null && (
        <VideoDescriptionShowMoreBtn
          onClick={
            showMoreText ? () => setShowMoreText((prevState) => !prevState) : () => {}
          }
        >
          {showMoreText ? 'Show less' : 'Show more'}
        </VideoDescriptionShowMoreBtn>
      )}
    </VideoDescriptionContainer>
  );
};

export default VideoDescription;
