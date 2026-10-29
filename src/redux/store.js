
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";  
import cartReducer from "./slices/cartSlice"; 
import authReducer from "./slices/authSlice";
import favReducer from "./slices/favSlice"; // NEW
export const store = configureStore({
  reducer: {
    productsStore: productsReducer,
    cartStore: cartReducer,
    authStore:authReducer,
    favStore: favReducer,
    ordersStore: ordersReducer,
  },
});     