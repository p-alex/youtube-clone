import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

export interface IChannel {
  user_id: string;
  username: string;
  profile_picture: string;
  description: string;
  total_subscribers: number;
  total_videos: number;
  subscribe_status?: boolean;
}

export interface IChannelMini {
  user_id: string;
  username: string;
  profile_picture: string;
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
  navSideBarMiniUsers: {
    list: IChannelMini[];
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
  navSideBarMiniUsers: {
    list: [],
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
    setMiniSubscriptions: (
      state,
      action: PayloadAction<{ subscriptionsMini: IChannelMini[] }>
    ) => {
      state.navSideBarMiniUsers.list = action.payload.subscriptionsMini;
    },
    addMiniSubscription: (
      state,
      action: PayloadAction<{
        user_id: string;
        username: string;
        profile_picture: string;
      }>
    ) => {
      state.navSideBarMiniUsers.list = [
        { ...action.payload },
        ...state.navSideBarMiniUsers.list,
      ];
    },
    removeMiniSubscription: (state, action: PayloadAction<{ userId: string }>) => {
      state.navSideBarMiniUsers.list = state.navSideBarMiniUsers.list.filter(
        (subscription) => subscription.user_id !== action.payload.userId
      );
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
    changeSubscriptionSubscribeStatus: (
      state,
      action: PayloadAction<{ isSubscribed: boolean; userId: string }>
    ) => {
      state.users.list = state.users.list.map((user) => {
        if (user.user_id === action.payload.userId) {
          user.subscribe_status = !action.payload.isSubscribed;
          user.total_subscribers = action.payload.isSubscribed
            ? user.total_subscribers - 1
            : user.total_subscribers + 1;
          return user;
        }
        return user;
      });
      state.videos.list = [];
      state.videos.page = 0;
    },
    resetSubscriptions: (state) => {
      state.users = { list: [], page: 0 };
      state.videos = { list: [], page: 0 };
    },
  },
});

export const {
  setSubscriptionVideos,
  setSubscriptionUsers,
  setMiniSubscriptions,
  loadMoreSubscriptionVideos,
  loadMoreSubscriptionUsers,
  incrementSubscriptionsVideosPage,
  incrementSubscriptionsUsersPage,
  changeSubscriptionSubscribeStatus,
  addMiniSubscription,
  removeMiniSubscription,
  resetSubscriptions,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
