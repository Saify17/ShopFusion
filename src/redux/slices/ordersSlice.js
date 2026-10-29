import { createSlice } from "@reduxjs/toolkit";

const getOrdersKey = (userId) => `orders_${userId}`;

const saveOrders = (state) => {
  if (!state.userId) return;
  localStorage.setItem(getOrdersKey(state.userId), JSON.stringify(state.orders));
};

const initialState = {
  orders: [],
  userId: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadUserOrders: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
      state.orders = JSON.parse(localStorage.getItem(getOrdersKey(userId)) || "[]");
    },
    resetOrdersState: (state) => {
      state.orders = [];
      state.userId = null;
    },

    addOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      saveOrders(state);
    },
  },
});

export const { loadUserOrders, resetOrdersState, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;