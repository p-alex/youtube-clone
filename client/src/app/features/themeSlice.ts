import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  theme: 'dark' | 'light';
}

const initialState: InitialState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === 'dark') {
        state.theme = 'light';
      } else {
        state.theme = 'dark';
      }
    },
    setTheme: (state, action: PayloadAction<{ theme: 'dark' | 'light' }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
