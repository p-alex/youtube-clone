import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LikeStatusType = 'like' | 'dislike' | '';

export interface VideoInfo {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  video_url: string;
  title: string;
  description: string;
  views: string;
  total_likes: number;
  total_dislikes: number;
  total_comments: number;
  duration: number;
  like_status: LikeStatusType;
  created_at: string;
}

export interface IVideoSmall {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  thumbnail_url: string;
  title: string;
  views: number;
  created_at: string;
}

export interface IVideoSmallWithInfo extends IVideoSmall {
  description: string;
  duration: number;
}

interface InitialState {
  canUseVideoKeyBinds: boolean;
  videoInfo: VideoInfo;
}

const initialState: InitialState = {
  canUseVideoKeyBinds: true,
  videoInfo: {
    video_id: '',
    user_id: '',
    username: '',
    profile_picture: '',
    total_subscribers: 0,
    video_url: '',
    title: '',
    description: '',
    views: '',
    total_likes: 0,
    total_dislikes: 0,
    total_comments: 0,
    duration: 0,
    like_status: '',
    created_at: '',
  },
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<VideoInfo>) => {
      state.videoInfo = action.payload;
    },
    addToTotalComments: (state) => {
      state.videoInfo.total_comments += 1;
    },
    subtractFromTotalComments: (state) => {
      state.videoInfo.total_comments -= 1;
    },
    likeVideo: (
      state,
      action: PayloadAction<{
        video_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      }>
    ) => {
      state.videoInfo.like_status = action.payload.like_status;
      state.videoInfo.total_likes = action.payload.total_likes;
      state.videoInfo.total_dislikes = action.payload.total_dislikes;
    },
    dislikeVideo: (
      state,
      action: PayloadAction<{
        video_id: string;
        like_status: LikeStatusType;
        total_likes: number;
        total_dislikes: number;
      }>
    ) => {
      state.videoInfo.like_status = action.payload.like_status;
      state.videoInfo.total_likes = action.payload.total_likes;
      state.videoInfo.total_dislikes = action.payload.total_dislikes;
    },
    disableKeyBinds: (state) => {
      state.canUseVideoKeyBinds = false;
    },
    enableKeyBinds: (state) => {
      state.canUseVideoKeyBinds = true;
    },
    resetVideo: (state) => {
      state.videoInfo = initialState.videoInfo;
    },
  },
});

export const {
  setVideo,
  addToTotalComments,
  subtractFromTotalComments,
  disableKeyBinds,
  enableKeyBinds,
  likeVideo,
  dislikeVideo,
  resetVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
