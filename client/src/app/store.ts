import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import videoReducer from './features/videoSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
