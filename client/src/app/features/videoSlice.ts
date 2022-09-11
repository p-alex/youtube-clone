import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  like_status: boolean | null;
  created_at: string;
}

interface InitialState {
  canUseVideoKeyBinds: boolean;
  videoInfo: VideoInfo;
}

const initialState: InitialState = {
  canUseVideoKeyBinds: true,
  videoInfo: {
    video_id: "",
    user_id: "",
    username: "",
    profile_picture: "",
    total_subscribers: 0,
    video_url: "",
    title: "",
    description: "",
    views: "",
    total_likes: 0,
    total_dislikes: 0,
    total_comments: 0,
    duration: 0,
    like_status: null,
    created_at: "",
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<VideoInfo>) => {
      state.videoInfo = action.payload;
    },
    likeVideo: (state) => {
      if (state.videoInfo.like_status === true) {
        state.videoInfo.like_status = null;
        state.videoInfo.total_likes -= 1;
      } else if (state.videoInfo.like_status === false) {
        state.videoInfo.like_status = true;
        state.videoInfo.total_likes += 1;
        state.videoInfo.total_dislikes -= 1;
      } else {
        state.videoInfo.like_status = true;
        state.videoInfo.total_likes += 1;
      }
    },
    dislikeVideo: (state) => {
      if (state.videoInfo.like_status === false) {
        state.videoInfo.like_status = null;
        state.videoInfo.total_dislikes -= 1;
      } else if (state.videoInfo.like_status === true) {
        state.videoInfo.like_status = false;
        state.videoInfo.total_likes -= 1;
        state.videoInfo.total_dislikes += 1;
      } else {
        state.videoInfo.like_status = false;
        state.videoInfo.total_dislikes += 1;
      }
    },
    disableKeyBinds: (state) => {
      state.canUseVideoKeyBinds = false;
    },
    enableKeyBinds: (state) => {
      state.canUseVideoKeyBinds = true;
    },
  },
});

export const {
  setVideo,
  disableKeyBinds,
  enableKeyBinds,
  likeVideo,
  dislikeVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
