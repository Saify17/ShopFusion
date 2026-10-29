import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// helper that saves the cart - per user now
const getCartKey = (userId) => `cart_${userId || 'guest'}`;

const saveCart = (state) => {
  const key = getCartKey(state.userId);
  localStorage.setItem(
    key,
    JSON.stringify({
      cart: state.cart,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      cartId: state.cartId,
    })
  );
  // also keep old key for backwards compat
  localStorage.setItem(
    "cart",
    JSON.stringify({
      cart: state.cart,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      cartId: state.cartId,
    })
  );
};

const loadCartFromStorage = (userId) => {
  try {
    const d = localStorage.getItem(getCartKey(userId));
    return d ? JSON.parse(d) : null;  
  } catch { 
    return null; 
  }
};



const initialState = { 
  cart: [], 
  totalItems: 0, 
  totalPrice: 0, 
  cartId: null, 
  userId: null, 
  loading: false, 
  error: null 
};

export const fetchCartByUser = createAsyncThunk("cart/fetchCartByUser", async(userid, {rejectWithValue})=>{
    try{
    
        if (userid > 208) {
          console.log(`Skipping cart API for custom user ${userid} - using localStorage only`);
          return { carts: [] }; // empty, so we keep localStorage cart
        }
        const response = await api.get(`/carts/user/${userid}`);
        return response.data;
    }catch(error){
        // Don't show error in console as red - just return empty
        console.log("Cart fetch failed (expected for custom users), using localStorage");
        return { carts: [] };
    }
});

export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async ({ product, userId = 1 }, { rejectWithValue }) => {
    try {
      const safeUserId = userId > 208 ? 1 : userId;
      const response = await api.post("/carts/add", {
        userId: safeUserId, 
        products: [{ id: product.id, quantity: 1 }],
      });
      console.log("ADD TO CART API RESULT:", response.data);
      return { apiCart: response.data, addedProduct: product };
    } catch (error) {
      console.log("ADD TO CART API ERROR:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadUserCart: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
      const loaded = loadCartFromStorage(userId);
      if (loaded) {
        state.cart = loaded.cart || [];
        state.totalItems = loaded.totalItems || 0;
        state.totalPrice = loaded.totalPrice || 0;
        state.cartId = loaded.cartId || null;
      } else {
        state.cart = [];
        state.totalItems = 0;
        state.totalPrice = 0;
        state.cartId = null;
      }
    },
    clearCartLocal:(state)=>{
        state.cart=[];
        state.totalItems=0;
        state.totalPrice=0;
        state.cartId=null;
        saveCart(state);
    },
    resetCartState: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.cartId = null;
      state.userId = null;
    },
    removeFromCart: (state, action) => {          
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
        state.totalItems = state.cart.reduce((s,i)=>s+(i.quantity||1),0);
        state.totalPrice = state.cart.reduce((s,i)=>s+(i.price*(i.quantity||1)),0);
        saveCart(state); 
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload; 
      const item = state.cart.find(i => i.id === id);
      if (!item) return; 
      item.quantity = (item.quantity || 1) + delta;
      if (item.quantity < 1) item.quantity = 1; 
      state.totalItems = state.cart.reduce((s,i)=>s+(i.quantity||1),0);
      state.totalPrice = state.cart.reduce((s,i)=>s+(i.price*(i.quantity||1)),0);
      saveCart(state);
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchCartByUser.pending, (state)=>{
        state.loading=true;
        state.error=null;
    });
    builder.addCase(fetchCartByUser.fulfilled, (state, action)=>{
        state.loading=false;
        state.error=null;
        const firstCart = action.payload.carts?.[0];
        // Only use API cart if local cart is empty (to not overwrite user's real cart)
        if(firstCart && state.cart.length === 0){
            state.cart=firstCart.products;
            state.totalItems= firstCart.totalQuantity;
            state.totalPrice = firstCart.total;
            state.cartId = firstCart.id
            saveCart(state);
        }
    });
    builder.addCase(fetchCartByUser.rejected, (state, action) => { 
        state.loading=false; 
        state.error=null; // don't show error for custom users
    });
    builder.addCase(addToCartApi.pending, (state)=>{
        state.loading=true;
        state.error=null;
    });
    builder.addCase(addToCartApi.fulfilled, (state, action)=>{
        state.loading=false;
        state.error=null;
        const added = action.payload.addedProduct;
        const existing = state.cart.find(i=>i.id===added.id);
        if(existing){ 
            existing.quantity = (existing.quantity || 1) + 1; 
        }else { 
            state.cart.push({...added, quantity:1}); 
        }
        state.totalItems = state.cart.reduce((s,i)=>s+(i.quantity||1),0);
        state.totalPrice = state.cart.reduce((s,i)=>s+(i.price*(i.quantity||1)),0);
        state.cartId = action.payload.apiCart.id;
        saveCart(state);
    });
    builder.addCase(addToCartApi.rejected, (state, action) => { 
        state.loading=false; 
        state.error=action.payload; 
    });
  } 
});
export const { clearCartLocal, removeFromCart, updateQuantity, loadUserCart, resetCartState } = cartSlice.actions;   
export default cartSlice.reducer;
