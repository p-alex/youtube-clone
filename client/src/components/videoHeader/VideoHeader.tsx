import React, { useState, useEffect } from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import {
  VideoHeaderUserInfo,
  VideoHeaderBtnsRow,
  VideoHeaderColumnContainer,
  VideoHeaderContainer,
  VideoHeaderSubscribers,
  VideoHeaderTitle,
  VideoHeaderUsername,
  LikeDislikeBtn,
  LikeDislikeGroup,
} from './VideoHeader.styles';
import useAuth from '../../hooks/useAuth';
import { dislikeVideo, likeVideo, VideoInfo } from '../../app/features/videoSlice';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { SubscribeButton } from '../../ui/SubscribeButton';
import Image from 'next/image';

const VideoHeader = ({ video }: { video: VideoInfo }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [actionType, setActionType] = useState<'like' | 'dislike' | null>(null);

  const [likeOrDislike, { isLoading, errors }] = useAxiosWithRetry<
    { actionType: 'like' | 'dislike' | null; videoId: string },
    {}
  >('api/videos/likes', 'POST');

  const handleLikeOrDislike = async () => {
    if (actionType === 'like') dispatch(likeVideo());
    if (actionType === 'dislike') dispatch(dislikeVideo());
    await likeOrDislike({ actionType: actionType, videoId: video.video_id });
    setActionType(null);
  };

  useEffect(() => {
    if (!actionType && accessToken) return;
    handleLikeOrDislike();
  }, [actionType]);

  return (
    <VideoHeaderContainer>
      <VideoHeaderTitle>{video.title}</VideoHeaderTitle>
      <VideoHeaderBtnsRow>
        <VideoHeaderUserInfo>
          <Image src={video.profile_picture} width="40" height="40" alt="" />
          <VideoHeaderColumnContainer>
            <VideoHeaderUsername>{video.username}</VideoHeaderUsername>
            <VideoHeaderSubscribers>
              {video.total_subscribers} subsribers
            </VideoHeaderSubscribers>
          </VideoHeaderColumnContainer>
          <SubscribeButton variant="normal">Subscribe</SubscribeButton>
        </VideoHeaderUserInfo>
        <LikeDislikeGroup>
          <LikeDislikeBtn onClick={() => setActionType('like')}>
            {video.like_status ? <AiFillLike /> : <AiOutlineLike />}
            {video.total_likes}
          </LikeDislikeBtn>
          <LikeDislikeBtn onClick={() => setActionType('dislike')}>
            {video.like_status === false ? <AiFillDislike /> : <AiOutlineDislike />}
            {video.total_dislikes}
          </LikeDislikeBtn>
        </LikeDislikeGroup>
      </VideoHeaderBtnsRow>
    </VideoHeaderContainer>
  );
};

export default VideoHeader;
