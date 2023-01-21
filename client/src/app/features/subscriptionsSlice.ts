import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IChannel {
  user_id: string;
  username: string;
  profile_picture: string;
  total_subscribers: number;
  total_videos: number;
  subscribe_status: boolean;
}

interface InitialState {
  videos: {
    list: IVideoSmall[];
    page: number;
  };
  users: {
    list: IChannel[];
    page: number;
  };
}

const initialState: InitialState = {
  videos: {
    list: [],
    page: 0,
  },
  users: {
    list: [],
    page: 0,
  },
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubscriptionVideos: (state, action: PayloadAction<{ videos: IVideoSmall[] }>) => {
      state.videos.list = action.payload.videos;
    },
    setSubscriptionUsers: (state, action: PayloadAction<{ users: IChannel[] }>) => {
      state.users.list = action.payload.users;
    },
    loadMoreSubscriptionVideos: (
      state,
      action: PayloadAction<{ videos: IVideoSmall[] }>
    ) => {
      state.videos.list = [...state.videos.list, ...action.payload.videos];
    },
    loadMoreSubscriptionUsers: (state, action: PayloadAction<{ users: IChannel[] }>) => {
      state.users.list = [...state.users.list, ...action.payload.users];
    },
    incrementSubscriptionsVideosPage: (state) => {
      state.videos.page = state.videos.page + 1;
    },
    incrementSubscriptionsUsersPage: (state) => {
      state.users.page = state.users.page + 1;
    },
  },
});

export const {
  setSubscriptionVideos,
  setSubscriptionUsers,
  loadMoreSubscriptionVideos,
  loadMoreSubscriptionUsers,
  incrementSubscriptionsVideosPage,
  incrementSubscriptionsUsersPage,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
