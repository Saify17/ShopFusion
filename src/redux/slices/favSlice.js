import { createSlice } from "@reduxjs/toolkit";

const getFavKey = (userId) => `fav_${userId}`;

const saveFav = (state) => {
  if (!state.userId) return;
  localStorage.setItem(getFavKey(state.userId), JSON.stringify(state.fav));
};

const loadFavFromStorage = (userId) => {
  try { const d = localStorage.getItem(getFavKey(userId)); return d ? JSON.parse(d) : []; }
  catch { return []; }
};

const initialState = { fav: [], userId: null };

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    loadUserFav: (state, action) => {
      state.userId = action.payload; // userId from login
      state.fav = loadFavFromStorage(action.payload); // load HIS favs
    },
    resetFavState: (state) => { state.fav = []; state.userId = null; },
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const exists = state.fav.some((p) => p.id === product.id);
      if (exists) state.fav = state.fav.filter((p) => p.id !== product.id); // unfav
      else state.fav = [product, ...state.fav]; // fav
      saveFav(state); // save per user
    },
  }
});
export const { loadUserFav, resetFavState, toggleFavorite } = favSlice.actions;
export default favSlice.reducer;