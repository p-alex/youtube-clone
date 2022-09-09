import React, { useState, useEffect } from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import {
  Header,
  RatioBar,
  ReactAndRatioContainer,
  ReactBtn,
  ReactBtnContainer,
  ReactContainer,
  Stats,
  Title,
} from './style';
import useAuth from '../../hooks/useAuth';
import { dislikeVideo, likeVideo, VideoInfo } from '../../app/features/videoSlice';
import { dateConverter } from '../../utils/dateConverter';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const VideoHeader = ({ video }: { video: VideoInfo }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const [actionType, setActionType] = useState<'like' | 'dislike' | null>(null);

  const [likeOrDislike, { isLoading, errors }] = useAxiosWithRetry<null>(
    'api/videos/likes',
    {
      body: { action_type: actionType, video_id: video.video_id },
      method: 'POST',
      accessToken: accessToken!,
    }
  );

  const handleLikeOrDislike = async () => {
    if (actionType === 'like') dispatch(likeVideo());
    if (actionType === 'dislike') dispatch(dislikeVideo());
    await likeOrDislike();
    setActionType(null);
  };

  useEffect(() => {
    if (!actionType && accessToken) return;
    handleLikeOrDislike();
  }, [actionType]);

  return (
    <Header>
      <Title>{video.title}</Title>
      <ReactContainer>
        <Stats>
          <span>{video.views} views</span>
          <span>•</span>
          <span>{dateConverter(new Date(video.created_at).getTime())}</span>
        </Stats>
        <ReactAndRatioContainer>
          <ReactBtnContainer>
            <ReactBtn
              disabled={!isAuth || isLoading}
              onClick={() => setActionType('like')}
            >
              {video.like_status ? <AiFillLike /> : <AiOutlineLike />} {video.total_likes}
            </ReactBtn>
            <ReactBtn
              disabled={!isAuth || isLoading}
              onClick={() => setActionType('dislike')}
            >
              {video.like_status === false ? <AiFillDislike /> : <AiOutlineDislike />}{' '}
              {video.total_dislikes}
            </ReactBtn>
          </ReactBtnContainer>
          <RatioBar
            width={(video.total_likes / (video.total_dislikes + video.total_likes)) * 100}
          ></RatioBar>
        </ReactAndRatioContainer>
      </ReactContainer>
    </Header>
  );
};

export default VideoHeader;
