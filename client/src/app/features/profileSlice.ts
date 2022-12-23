import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IProfileInfo {
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  created_at: string;
}

export interface ProfileInitialState {
  activeTab: 'VIDEOS' | 'ABOUT';
  videosTab: {
    videos: IVideoSmall[];
    sortBy: 'recent' | 'popular';
    page: number;
    limit: 16;
  };
  profileInfo: IProfileInfo | null;
}

const initialState: ProfileInitialState = {
  activeTab: 'VIDEOS',
  videosTab: {
    videos: [],
    sortBy: 'recent',
    page: 0,
    limit: 16,
  },
  profileInfo: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileInfo: (state, action: PayloadAction<{ profileInfo: IProfileInfo }>) => {
      state.profileInfo = action.payload.profileInfo;
    },
    setProfileVideos: (state, action: PayloadAction<{ videos: IVideoSmall[] }>) => {
      state.videosTab.videos = action.payload.videos;
    },
    incrementVideosPage: (state) => {
      state.videosTab.page = state.videosTab.page + 1;
    },
    changeSortBy: (state, action: PayloadAction<{ sortBy: 'recent' | 'popular' }>) => {
      state.videosTab.sortBy = action.payload.sortBy;
      state.videosTab.page = 0;
    },
    loadMoreProfileVideos: (state, action: PayloadAction<{ videos: IVideoSmall[] }>) => {
      state.videosTab.videos = [...state.videosTab.videos, ...action.payload.videos];
    },
  },
});

export const {
  setProfileInfo,
  setProfileVideos,
  incrementVideosPage,
  changeSortBy,
  loadMoreProfileVideos,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
