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
  const [showMoreText, setShowMoreText] = useState<boolean>(false);
  const created_at = useRef(dateConverter(new Date(video.created_at).getTime()));
  return (
    <VideoPageDescription__Container
      showMoreText={showMoreText}
      onClick={() =>
        showMoreText === false ? setShowMoreText((prevState) => !prevState) : undefined
      }
    >
      <VideoPageDescription__Stats>
        <span>{video.views} views</span>•<span>{created_at.current}</span>
      </VideoPageDescription__Stats>
      <VideoPageDescription__Text showMoreText={showMoreText} id={'videoDescription'}>
        {video.description}{' '}
      </VideoPageDescription__Text>
      {video.description && showMoreText !== null && (
        <VideoPageDescription__ShowMoreBtn
          showMoreText={showMoreText}
          onClick={() => setShowMoreText((prevState) => !prevState)}
        >
          {showMoreText ? 'Show less' : 'Show more'}
        </VideoPageDescription__ShowMoreBtn>
      )}
    </VideoPageDescription__Container>
  );
};

export default VideoPageDescription;
