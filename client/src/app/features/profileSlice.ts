import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IProfileAbout {
  description: string;
  total_videos: number;
  total_views: number;
  created_at: string;
}

export interface IProfileBasicInfo {
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
}

const TABS = ['VIDEOS', 'ABOUT'] as const;

type Tab = typeof TABS[number];

export interface ProfileInitialState {
  tabs: typeof TABS;
  activeTab: Tab;
  videosTab: {
    videos: IVideoSmall[];
    sortBy: 'recent' | 'popular';
    page: number;
    limit: 16;
  };
  aboutTab: {
    description: string;
    total_videos: number;
    total_views: number;
    created_at: string;
  };
  profileBasicInfo: IProfileBasicInfo | null;
}

const initialState: ProfileInitialState = {
  tabs: TABS,
  activeTab: 'VIDEOS',
  videosTab: {
    videos: [],
    sortBy: 'recent',
    page: 0,
    limit: 16,
  },
  aboutTab: {
    description: '',
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
    },
    setProfileAbout: (state, action: PayloadAction<{ profileAbout: IProfileAbout }>) => {
      state.aboutTab = action.payload.profileAbout;
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
  incrementVideosPage,
  changeProfileVideosSortBy,
  loadMoreProfileVideos,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
