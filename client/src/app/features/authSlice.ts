import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const USERNAME_RESTRICTIONS = {
  minLength: 3,
  maxLength: 24,
};

export const PASSWORD_RESTRICTIONS = {
  minLength: 8,
  maxLength: 50,
};

interface IInitialState {
  user: {
    user_id: string;
    username: string;
    email: string;
    profile_picture: string;
  };
  accessToken: string;
  isGettingUser: boolean;
}

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  profile_picture: string;
}

const initialState: IInitialState = {
  user: {
    user_id: '',
    username: '',
    email: '',
    profile_picture: '',
  },
  accessToken: '',
  isGettingUser: true,
};

export const DEFAULT_PROFILE_PICTURE_URL = '/images/default-profile-picture.jpg';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    resetUser: (state) => {
      state.user = {
        user_id: '',
        username: '',
        email: '',
        profile_picture: '',
      };
      state.accessToken = '';
    },
    setIsGettingUser: (state, action: PayloadAction<boolean>) => {
      state.isGettingUser = action.payload;
    },
    changeUserInfo: (
      state,
      action: PayloadAction<{ key: keyof typeof state.user; value: string }>
    ) => {
      state.user[action.payload.key] = action.payload.value;
    },
  },
});

export const { setUser, resetUser, setIsGettingUser, changeUserInfo } = authSlice.actions;

export default authSlice.reducer;
