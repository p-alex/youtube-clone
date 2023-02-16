import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import videoReducer from './features/videoSlice';
import authReducer from './features/authSlice';
import manageVideosReducer from './features/manageVideo';
import suggestionsReducer from './features/suggestionsSlice';
import profileReducer from './features/profileSlice';
import subscriptionsReducer from './features/subscriptionsSlice';
import navbarReducer from './features/navBarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    video: videoReducer,
    suggestions: suggestionsReducer,
    manageVideos: manageVideosReducer,
    profile: profileReducer,
    subscriptions: subscriptionsReducer,
    navbar: navbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
