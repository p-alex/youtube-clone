import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  user: IUser | null;
  accessToken: string | null;
}

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  profile_picture: string;
}

const initialState: IInitialState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    resetUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
