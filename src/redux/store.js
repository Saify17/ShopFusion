
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    productsStore: productsReducer,
  },
});     