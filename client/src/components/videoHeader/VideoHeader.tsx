import React from 'react';
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
import ProfileImage from '../../ui/ProfileImage';

const VideoHeader = ({ video }: { video: VideoInfo }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

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

  const handleLikeVideo = async () => {
    if (!accessToken) return router.push('/signin');
    const response = await likeVideoRequest({});
    if (!response.success || !response.result) return;
    dispatch(likeVideo(response.result));
  };

  const handleDislikeVideo = async () => {
    if (!accessToken) return router.push('/signin');
    const response = await dislikeVideoRequest({});
    if (!response.success || !response.result) return;
    dispatch(dislikeVideo(response.result));
  };

  return (
    <VideoHeaderContainer>
      <VideoHeaderTitle>{video.title}</VideoHeaderTitle>
      <VideoHeaderBtnsRow>
        <VideoHeaderUserInfo>
          <ProfileImage
            imageUrl={video.profile_picture}
            width={40}
            height={40}
            username={video.username}
          />
          <VideoHeaderColumnContainer>
            <VideoHeaderUsername>{video.username}</VideoHeaderUsername>
            <VideoHeaderSubscribers>
              {video.total_subscribers} subsribers
            </VideoHeaderSubscribers>
          </VideoHeaderColumnContainer>
          <SubscribeButton variant="normal">Subscribe</SubscribeButton>
        </VideoHeaderUserInfo>
        <LikeDislikeGroup>
          <LikeDislikeBtn onClick={handleLikeVideo}>
            {video.like_status === 'like' ? <AiFillLike /> : <AiOutlineLike />}
            {video.total_likes}
          </LikeDislikeBtn>
          <LikeDislikeBtn onClick={handleDislikeVideo}>
            {video.like_status === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />}
            {video.total_dislikes}
          </LikeDislikeBtn>
        </LikeDislikeGroup>
      </VideoHeaderBtnsRow>
    </VideoHeaderContainer>
  );
};

export default VideoHeader;
