import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from './slices/user';
import storeSlice from './slices/store';
import  navSlice from './slices/destination';
import  bookingSlice from './slices/booking';


const store = configureStore({
  reducer: {
    user: userSlice,
    store: storeSlice,
    nav: navSlice,
    booking: bookingSlice
  }
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
