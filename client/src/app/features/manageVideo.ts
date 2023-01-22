import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditVideoSchemaType } from '../../schemas/editVideoModal.schema';

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
  lastFocusedElement: string | null;
}

const initialState: InitialState = {
  videos: [],
  videoToEdit: null,
  videoToDelete: null,
  lastFocusedElement: null,
};

export const manageVideosSlice = createSlice({
  name: 'manageVideos',
  initialState,
  reducers: {
    setUserVideos: (state, action: PayloadAction<IVideo[]>) => {
      state.videos = action.payload;
    },
    selectVideoToEdit: (state, action: PayloadAction<{ video: IVideo }>) => {
      state.videoToEdit = action.payload.video;
    },
    selectVideoToDelete: (state, action: PayloadAction<{ videoId: string }>) => {
      state.videoToDelete = action.payload.videoId;
    },
    resetVideoToEdit: (state) => {
      state.videoToEdit = null;
    },
    resetVideoToDelete: (state) => {
      state.videoToDelete = null;
    },
    setLastFocusedManageVideoBtnId: (
      state,
      action: PayloadAction<{ lastFocusedElementId: string }>
    ) => {
      state.lastFocusedElement = action.payload.lastFocusedElementId;
    },
    editVideo: (state, action: PayloadAction<EditVideoSchemaType>) => {
      state.videos = state.videos.map((video) => {
        if (video.video_id === action.payload.videoId) {
          video.title = action.payload.title;
          video.thumbnail_url = action.payload.thumbnailData.currentThumbnailUrl;
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
    resetManageVideos: (state) => {
      state.videos = [];
      state.videoToEdit = null;
      state.videoToDelete = null;
      state.lastFocusedElement = null;
    },
  },
});

export const {
  setUserVideos,
  selectVideoToEdit,
  selectVideoToDelete,
  setLastFocusedManageVideoBtnId,
  resetVideoToEdit,
  resetVideoToDelete,
  editVideo,
  removeVideo,
  resetManageVideos,
} = manageVideosSlice.actions;

export default manageVideosSlice.reducer;
