import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = shopSlice.actions;

export default shopSlice.reducer;
