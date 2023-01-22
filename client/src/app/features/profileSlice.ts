import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IProfileAbout {
  total_videos: number;
  total_views: number;
  created_at: string;
}

export interface IProfileInfo {
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  description: string;
  subscribe_status: boolean;
  total_videos: number;
  total_views: number;
  created_at: string;
}

const TABS = ['videos', 'about'];

type Tab = typeof TABS[number];

export interface ProfileInitialState {
  tabs: string[];
  activeTab: string;
  videosTab: {
    videos: IVideoSmall[];
    sortBy: 'recent' | 'popular';
    page: number;
    limit: 16;
    showLoadMoreVideosBtn: boolean;
  };
  profileInfo: IProfileInfo | null;
}

const initialState: ProfileInitialState = {
  tabs: TABS,
  activeTab: 'videos',
  videosTab: {
    videos: [],
    sortBy: 'recent',
    page: 0,
    limit: 16,
    showLoadMoreVideosBtn: false,
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
      state.videosTab.showLoadMoreVideosBtn =
        action.payload.videos.length === state.videosTab.limit;
    },
    setProfileActiveTab: (state, action: PayloadAction<{ tab: string }>) => {
      if (state.tabs.includes(action.payload.tab)) {
        state.activeTab = action.payload.tab;
      } else {
        state.activeTab = '';
      }
    },
    changeProfileTab: (state, action: PayloadAction<{ tab: Tab }>) => {
      state.activeTab = action.payload.tab;
    },
    incrementVideosPage: (state) => {
      state.videosTab.page = state.videosTab.page + 1;
    },
    changeProfileVideosSortBy: (
      state,
      action: PayloadAction<{ sortBy: 'recent' | 'popular' }>
    ) => {
      state.videosTab.sortBy = action.payload.sortBy;
      state.videosTab.page = 0;
    },
    loadMoreProfileVideos: (state, action: PayloadAction<{ videos: IVideoSmall[] }>) => {
      state.videosTab.videos = [...state.videosTab.videos, ...action.payload.videos];
    },
    subscribeToProfileOwner: (
      state,
      action: PayloadAction<{ isSubscribed: boolean }>
    ) => {
      state.profileInfo!.subscribe_status = !action.payload.isSubscribed;
      state.profileInfo!.total_subscribers =
        !action.payload.isSubscribed === true
          ? state.profileInfo!.total_subscribers + 1
          : state.profileInfo!.total_subscribers - 1;
    },
    resetProfile: (state) => {
      state.profileInfo = null;
      state.videosTab.videos = [];
      state.videosTab.page = 0;
      state.videosTab.sortBy = 'recent';
    },
  },
});

export const {
  setProfileInfo,
  setProfileVideos,
  changeProfileTab,
  setProfileActiveTab,
  incrementVideosPage,
  changeProfileVideosSortBy,
  loadMoreProfileVideos,
  subscribeToProfileOwner,
  resetProfile,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
