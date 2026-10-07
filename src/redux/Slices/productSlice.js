// src/redux/slices/productsSlice.js
// Chain: Products.jsx dispatches fetchProducts() -> api call -> state updates
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 20, skip = 0 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 20,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSkip } = productsSlice.actions;
export default productsSlice.reducer;