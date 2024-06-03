import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import pdfReducer from "./pdfSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    pdf: pdfReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
