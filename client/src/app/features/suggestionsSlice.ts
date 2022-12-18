import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoSmall } from './videoSlice';

interface InitialState {
  suggestions: IVideoSmall[];
  page: number;
}

const initialState: InitialState = {
  suggestions: [],
  page: 0,
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSuggestions: (state, action: PayloadAction<{ suggestions: IVideoSmall[] }>) => {
      state.suggestions = action.payload.suggestions;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    loadMoreSuggestions: (
      state,
      action: PayloadAction<{ suggestions: IVideoSmall[] }>
    ) => {
      state.suggestions = [...state.suggestions, ...action.payload.suggestions];
    },
  },
});

export const { setSuggestions, incrementPage, loadMoreSuggestions } =
  suggestionsSlice.actions;

export default suggestionsSlice.reducer;
