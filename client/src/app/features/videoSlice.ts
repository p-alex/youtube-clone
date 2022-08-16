import { createSlice } from '@reduxjs/toolkit';

export interface IVideo {
  title: string;
  username: string;
  profile_picture: string;
  views: string;
  createdAt: string;
  image: string;
}

const initialState = {
  videos: [
    {
      title: 'This is a test titleThis is a test title',
      image: '/images/video-image-1.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
    {
      title: 'This is a test title',
      image: '/images/video-image-2.jpg',
      username: 'Jordbær',
      profile_picture: '/images/profile_picture.jpg',
      views: '1.1k',
      createdAt: '3 hours ago',
    },
  ],
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
});

export const {} = videoSlice.actions;

export default videoSlice.reducer;
