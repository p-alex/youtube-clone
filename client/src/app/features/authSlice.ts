import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  user: {
    user_id: string;
    username: string;
    email: string;
    profile_picture: string;
  };
  accessToken: string;
}

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  profile_picture: string;
}

const initialState: IInitialState = {
  user: {
    user_id: "",
    username: "",
    email: "",
    profile_picture: "",
  },
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    resetUser: (state) => {
      state.user = {
        user_id: "",
        username: "",
        email: "",
        profile_picture: "",
      };
      state.accessToken = "";
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
