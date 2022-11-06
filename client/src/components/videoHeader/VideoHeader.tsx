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
import {
  dislikeVideo,
  LikeStatusType,
  likeVideo,
  VideoInfo,
} from '../../app/features/videoSlice';
import useAxiosWithRetry from '../../hooks/useAxiosWithRetry';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { SubscribeButton } from '../../ui/SubscribeButton';
import Image from 'next/image';
import router from 'next/router';

const VideoHeader = ({ video }: { video: VideoInfo }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [actionType, setActionType] = useState<'like' | 'dislike' | null>(null);

  const [likeOrDislike, { isLoading, errors }] = useAxiosWithRetry<
    { actionType: 'like' | 'dislike' | null; videoId: string },
    {
      video_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    }
  >('api/videos/likes', 'POST');

  const handleLikeOrDislike = async () => {
    if (!accessToken) return router.push('/signin');
    const response = await likeOrDislike({
      actionType: actionType,
      videoId: video.video_id,
    });
    if (!response.success || !response.result) return;
    if (actionType === 'like') dispatch(likeVideo(response.result));
    if (actionType === 'dislike') dispatch(dislikeVideo(response.result));
    setActionType(null);
  };

  useEffect(() => {
    if (!actionType) return;
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
            {video.like_status === 'like' ? <AiFillLike /> : <AiOutlineLike />}
            {video.total_likes}
          </LikeDislikeBtn>
          <LikeDislikeBtn onClick={() => setActionType('dislike')}>
            {video.like_status === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />}
            {video.total_dislikes}
          </LikeDislikeBtn>
        </LikeDislikeGroup>
      </VideoHeaderBtnsRow>
    </VideoHeaderContainer>
  );
};

export default VideoHeader;
