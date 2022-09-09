import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVideoSmall {
  video_id: string;
  user_id: string;
  username: string;
  profile_picture: string;
  thumbnail_url: string;
  title: string;
  views: number;
  created_at: string;
}

interface InitialState {
  videos: IVideoSmall[];
}

const initialState: InitialState = {
  videos: [],
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<IVideoSmall[]>) => {
      state.videos = action.payload;
    },
  },
});

export const { setVideos } = videosSlice.actions;

export default videosSlice.reducer;
