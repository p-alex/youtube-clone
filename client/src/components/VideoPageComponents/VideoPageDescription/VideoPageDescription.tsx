import { useState, useEffect, useRef } from 'react';
import { VideoInfo } from '../../../app/features/videoSlice';
import { dateConverter } from '../../../utils/dateConverter';

import {
  VideoPageDescription__Container,
  VideoPageDescription__ShowMoreBtn,
  VideoPageDescription__Stats,
  VideoPageDescription__Text,
} from './VideoPageDescription.styles';

const VideoPageDescription = ({ video }: { video: VideoInfo }) => {
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
    <VideoPageDescription__Container
      showMoreText={showMoreText}
      onClick={
        showMoreText
          ? () => {}
          : showMoreText === false
          ? () => setShowMoreText((prevState) => !prevState)
          : () => {}
      }
    >
      <VideoPageDescription__Stats>
        <span>{video.views} views</span>•<span>{created_at.current}</span>
      </VideoPageDescription__Stats>
      <VideoPageDescription__Text showMoreText={showMoreText} id={'videoDescription'}>
        {video.description}{' '}
      </VideoPageDescription__Text>
      {showMoreText !== null && (
        <VideoPageDescription__ShowMoreBtn
          onClick={
            showMoreText ? () => setShowMoreText((prevState) => !prevState) : () => {}
          }
        >
          {showMoreText ? 'Show less' : 'Show more'}
        </VideoPageDescription__ShowMoreBtn>
      )}
    </VideoPageDescription__Container>
  );
};

export default VideoPageDescription;
