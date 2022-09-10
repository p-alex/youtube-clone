import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IVideo {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  video_url: string;
  thumbnail_url: string;
  title: string;
  description: string;
  views: number;
  duration: number;
  total_likes: number;
  total_dislikes: number;
  created_at: string;
}
interface InitialState {
  videos: IVideo[];
  videoToEdit: IVideo | null;
  videoToDelete: string | null;
}

const initialState: InitialState = {
  videos: [],
  videoToEdit: null,
  videoToDelete: null,
};

export const manageVideosSlice = createSlice({
  name: "manageVideos",
  initialState,
  reducers: {
    setUserVideos: (state, action: PayloadAction<IVideo[]>) => {
      state.videos = action.payload;
    },
    selectVideoToEdit: (state, action: PayloadAction<IVideo>) => {
      state.videoToEdit = action.payload;
    },
    selectVideoToDelete: (state, action: PayloadAction<string>) => {
      state.videoToDelete = action.payload;
    },
    resetVideoToEdit: (state) => {
      state.videoToEdit = null;
    },
    resetVideoToDelete: (state) => {
      state.videoToDelete = null;
    },
    editVideo: (
      state,
      action: PayloadAction<{
        video_id: string;
        title: string;
        thumbnail_url: string;
      }>
    ) => {
      state.videos = state.videos.map((video) => {
        if (video.video_id === action.payload.video_id) {
          video.title = action.payload.title;
          video.thumbnail_url = action.payload.thumbnail_url;
          return video;
        }
        return video;
      });
    },
    removeVideo: (state, action: PayloadAction<{ video_id: string }>) => {
      state.videos = state.videos.filter(
        (video) => video.video_id !== action.payload.video_id
      );
    },
  },
});

export const {
  setUserVideos,
  selectVideoToEdit,
  selectVideoToDelete,
  resetVideoToEdit,
  resetVideoToDelete,
  editVideo,
  removeVideo,
} = manageVideosSlice.actions;

export default manageVideosSlice.reducer;
