import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  likeOrDislikeVideo,
  LikeStatusType,
  VideoInfo,
} from '../app/features/videoSlice';
import { RootState } from '../app/store';
import useAxiosWithRetry from '../hooks/requestHooks/useAxiosWithRetry';
import { BORDER_RADIUS_ROUNDER } from '../layout/style';

export const LikeDislikeVideoGroup__Container = styled.div`
  position: relative;
  border-radius: ${BORDER_RADIUS_ROUNDER}px;
  background-color: ${(props) => props.theme.uiSecondaryBg};
  display: flex;
  align-items: center;
  height: 35px;
`;

export const LikeDislikeVideoGroup__Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  height: 100%;
  padding: 0 var(--space-medium);
  gap: var(--space-small);
  font-size: 1rem;
  font-weight: 600;
  &:disabled {
    opacity: 0.2;
  }
  svg {
    font-size: 1.2rem;
  }
  &:first-of-type {
    border-top-left-radius: ${BORDER_RADIUS_ROUNDER}px;
    border-bottom-left-radius: ${BORDER_RADIUS_ROUNDER}px;
  }
  &:last-of-type {
    border-top-right-radius: ${BORDER_RADIUS_ROUNDER}px;
    border-bottom-right-radius: ${BORDER_RADIUS_ROUNDER}px;
  }
  &:last-of-type::before {
    content: '';
    position: absolute;
    height: 70%;
    width: 1px;
    background-color: ${(props) => props.theme.borderColor};
    left: 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.normalBtn.bgHover};
  }
`;

const LikeDislikeVideoGroup = ({ video }: { video: VideoInfo }) => {
  const router = useRouter();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { total_likes, total_dislikes } = useSelector(
    (state: RootState) => state.video.videoInfo
  );
  const dispatch = useDispatch();

  const [likeStatus, setLikeStatus] = useState<LikeStatusType>('');

  const [
    checkIfVideoIsLikedRequest,
    { isLoading: isCheckIfVideoIsLikedLoading, errors: checkIfVideoIsLikedErrors },
  ] = useAxiosWithRetry<{}, { like_status: LikeStatusType }>(
    `api/videos/like-status/${video.video_id}`
  );

  const handleCheckIfVideoIsLiked = async () => {
    const response = await checkIfVideoIsLikedRequest({});
    if (!response.success || !response.result) return;
    setLikeStatus(response.result.like_status);
  };

  useEffect(() => {
    if (!accessToken || !video?.video_id) return;
    handleCheckIfVideoIsLiked();
  }, [accessToken, video.video_id]);

  const [likeVideoRequest, { isLoading: isLikeVideoLoading, errors: LikeVideoErrors }] =
    useAxiosWithRetry<
      {},
      {
        video_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      }
    >(`api/videos/${video.video_id}/like`, 'POST');

  const [
    dislikeVideoRequest,
    { isLoading: isDislikeVideoLoading, errors: DislikeVideoErrors },
  ] = useAxiosWithRetry<
    {},
    {
      video_id: string;
      like_status: LikeStatusType;
      total_likes: number;
      total_dislikes: number;
    }
  >(`api/videos/${video.video_id}/dislike`, 'POST');

  const handleLikeOrDislike = async (type: 'like' | 'dislike') => {
    if (!accessToken) return router.push('/signin');

    const response =
      type === 'like' ? await likeVideoRequest({}) : await dislikeVideoRequest({});
    if (!response.success || !response.result) return;

    const { video_id, like_status, total_likes, total_dislikes } = response.result;

    dispatch(likeOrDislikeVideo({ video_id, total_likes, total_dislikes }));
    setLikeStatus(like_status);
  };

  return (
    <LikeDislikeVideoGroup__Container>
      <LikeDislikeVideoGroup__Button
        onClick={() => handleLikeOrDislike('like')}
        disabled={
          isCheckIfVideoIsLikedLoading || isLikeVideoLoading || isDislikeVideoLoading
        }
      >
        {likeStatus === 'like' ? <AiFillLike /> : <AiOutlineLike />}
        {total_likes}
      </LikeDislikeVideoGroup__Button>
      <LikeDislikeVideoGroup__Button
        onClick={() => handleLikeOrDislike('dislike')}
        disabled={
          isCheckIfVideoIsLikedLoading || isLikeVideoLoading || isDislikeVideoLoading
        }
      >
        {likeStatus === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />}
        {total_dislikes}
      </LikeDislikeVideoGroup__Button>
    </LikeDislikeVideoGroup__Container>
  );
};

export default LikeDislikeVideoGroup;
