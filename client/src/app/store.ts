import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import videoReducer from "./features/videoSlice";
import videosReducer from "./features/videosSlice";
import authReducer from "./features/authSlice";
import manageVideosReducer from "./features/manageVideo";
import commentsSectionReducer from "./features/commentsSectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    video: videoReducer,
    commentsSection: commentsSectionReducer,
    videos: videosReducer,
    manageVideos: manageVideosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
