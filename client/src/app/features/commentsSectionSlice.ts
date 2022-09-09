import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  page: 0,
  limit: 20,
};

export const commentsSection = createSlice({
  name: 'commentsSection',
  initialState,
  reducers: {},
});
