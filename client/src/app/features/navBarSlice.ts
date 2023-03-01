import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NavBarActiveTab =
  | 'sidebar'
  | 'profile-drop-down'
  | 'mobile-search'
  | 'upload-modal'
  | '';

interface InitialState {
  searchQuery: string;
  activeTab: NavBarActiveTab;
}

const initialState: InitialState = {
  searchQuery: '',
  activeTab: '',
};

const navBarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    changeSearchQuery: (state, action: PayloadAction<{ searchQuery: string }>) => {
      state.searchQuery = action.payload.searchQuery.toLowerCase().trim();
    },
    setNavActiveTab: (state, action: PayloadAction<{ tab: NavBarActiveTab }>) => {
      state.activeTab = state.activeTab === action.payload.tab ? '' : action.payload.tab;
    },
    resetNavBar: (state) => {
      state.searchQuery = '';
      state.activeTab = '';
    },
  },
});

export const { changeSearchQuery, setNavActiveTab, resetNavBar } = navBarSlice.actions;

export default navBarSlice.reducer;
