// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booking: {},
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking(state, action) {
      state.booking = action.payload;
    },
  },
});

export const { setBooking } = bookingSlice.actions;
export const booking = (state) => state.booking.booking;
export default bookingSlice.reducer;
