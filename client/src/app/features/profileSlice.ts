import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IProfileAbout {
  total_videos: number;
  total_views: number;
  created_at: string;
}

export interface IProfileBasicInfo {
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  description: string;
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
  aboutTab: IProfileAbout;
  profileBasicInfo: IProfileBasicInfo | null;
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
  aboutTab: {
    total_videos: 0,
    total_views: 0,
    created_at: '',
  },
  profileBasicInfo: null,
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileBasicInfo: (
      state,
      action: PayloadAction<{ profileInfo: IProfileBasicInfo }>
    ) => {
      state.profileBasicInfo = action.payload.profileInfo;
    },
    setProfileVideos: (state, action: PayloadAction<{ videos: IVideoSmall[] }>) => {
      state.videosTab.videos = action.payload.videos;
      state.videosTab.showLoadMoreVideosBtn =
        action.payload.videos.length === state.videosTab.limit;
    },
    setProfileAbout: (state, action: PayloadAction<{ profileAbout: IProfileAbout }>) => {
      state.aboutTab = action.payload.profileAbout;
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
  },
});

export const {
  setProfileBasicInfo,
  setProfileVideos,
  setProfileAbout,
  changeProfileTab,
  setProfileActiveTab,
  incrementVideosPage,
  changeProfileVideosSortBy,
  loadMoreProfileVideos,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
