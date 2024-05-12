// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  store: {},
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore(state, action) {
      state.store = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;
export const store = (state) => state.store.store;
export default storeSlice.reducer;
