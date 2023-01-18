import React from 'react';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import {
  VideoPageHeader__BtnsRow,
  VideoPageHeader__ColumnContainer,
  VideoPageHeader__Container,
  VideoPageHeader__LikeDislikeBtn,
  VideoPageHeader__LikeDislikeGroup,
  VideoPageHeader__Subscribers,
  VideoPageHeader__Title,
  VideoPageHeader__UserInfo,
  VideoPageHeader__Username,
} from './VideoPageHeader.styles';
import {
  dislikeVideo,
  LikeStatusType,
  likeVideo,
  VideoInfo,
} from '../../../app/features/videoSlice';
import useAxiosWithRetry from '../../../hooks/requestHooks/useAxiosWithRetry';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import router from 'next/router';
import ProfileImage from '../../../ui/ProfileImage';
import SubscribeButton from '../../../ui/SubscribeButton';

const VideoPageHeader = ({ video }: { video: VideoInfo }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const currentUserId = useSelector((state: RootState) => state.auth.user.user_id);
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
    <VideoPageHeader__Container>
      <VideoPageHeader__Title>{video.title}</VideoPageHeader__Title>
      <VideoPageHeader__BtnsRow>
        <VideoPageHeader__UserInfo>
          <ProfileImage
            imageUrl={video.profile_picture}
            width={40}
            height={40}
            username={video.username}
          />
          <VideoPageHeader__ColumnContainer>
            <VideoPageHeader__Username>{video.username}</VideoPageHeader__Username>
            <VideoPageHeader__Subscribers>
              {video.total_subscribers} subsribers
            </VideoPageHeader__Subscribers>
          </VideoPageHeader__ColumnContainer>
          {video.user_id !== currentUserId && (
            <SubscribeButton
              isSubscribed={video.subscribe_status}
              subscribeToUserId={video.user_id}
              subscribeToUsername={video.username}
            />
          )}
        </VideoPageHeader__UserInfo>
        <VideoPageHeader__LikeDislikeGroup>
          <VideoPageHeader__LikeDislikeBtn onClick={handleLikeVideo}>
            {video.like_status === 'like' ? <AiFillLike /> : <AiOutlineLike />}
            {video.total_likes}
          </VideoPageHeader__LikeDislikeBtn>
          <VideoPageHeader__LikeDislikeBtn onClick={handleDislikeVideo}>
            {video.like_status === 'dislike' ? <AiFillDislike /> : <AiOutlineDislike />}
            {video.total_dislikes}
          </VideoPageHeader__LikeDislikeBtn>
        </VideoPageHeader__LikeDislikeGroup>
      </VideoPageHeader__BtnsRow>
    </VideoPageHeader__Container>
  );
};

export default VideoPageHeader;
