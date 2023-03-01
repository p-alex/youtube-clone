import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LikeStatusType = 'like' | 'dislike' | '';

export interface VideoInfo {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  video_url: string;
  thumbnail_url: string;
  title: string;
  description: string;
  views: string;
  total_likes: number;
  total_dislikes: number;
  total_comments: number;
  duration: number;
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
  duration: number;
  created_at: string;
}

export interface IVideoSmallWithInfo extends IVideoSmall {
  description: string;
  duration: number;
}

export interface IVideoSmallWithInfoRanked extends IVideoSmallWithInfo {
  rank: number;
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
    thumbnail_url: '',
    title: '',
    description: '',
    views: '',
    total_likes: 0,
    total_dislikes: 0,
    total_comments: 0,
    duration: 0,
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
    likeOrDislikeVideo: (
      state,
      action: PayloadAction<{
        video_id: string;
        total_likes: number;
        total_dislikes: number;
      }>
    ) => {
      state.videoInfo.total_likes = action.payload.total_likes;
      state.videoInfo.total_dislikes = action.payload.total_dislikes;
    },

    subscribeToVideoOwner: (state, action: PayloadAction<{ isSubscribed: boolean }>) => {
      state.videoInfo!.total_subscribers =
        !action.payload.isSubscribed === true
          ? state.videoInfo!.total_subscribers + 1
          : state.videoInfo!.total_subscribers - 1;
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
    resetVideoState: (state) => {
      state.canUseVideoKeyBinds = true;
      state.videoInfo = {
        video_id: '',
        user_id: '',
        username: '',
        profile_picture: '',
        total_subscribers: 0,
        video_url: '',
        thumbnail_url: '',
        title: '',
        description: '',
        views: '',
        total_likes: 0,
        total_dislikes: 0,
        total_comments: 0,
        duration: 0,
        created_at: '',
      };
    },
  },
});

export const {
  setVideo,
  addToTotalComments,
  subtractFromTotalComments,
  disableKeyBinds,
  enableKeyBinds,
  likeOrDislikeVideo,
  subscribeToVideoOwner,
  resetVideo,
  resetVideoState,
} = videoSlice.actions;

export default videoSlice.reducer;
