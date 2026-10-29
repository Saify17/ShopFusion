import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// NEW: helper that saves the cart
 const saveCart = (state) => {
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

// NEW: read the saved cart once when the app starts
 const savedCart = JSON.parse(localStorage.getItem("cart") || "null");

 const initialState = {
  cart: savedCart?.cart || [],
  totalItems: savedCart?.totalItems || 0, 
  totalPrice: savedCart?.totalPrice || 0, 
  cartId: savedCart?.cartId || null,
  loading: false,
  error: null,
 };

export const fetchCartByUser = createAsyncThunk("cart/fetchCartByUser", async(userid, {rejectWithValue})=>{
    try{
        const response = await api.get(`/carts/user/${userid}`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
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

      // NEW: check this in the browser console
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
    clearCartLocal:(state)=>{
        state.cart=[];
        state.totalItems=0;
        state.totalPrice=0;
        state.cartId=null;
        saveCart(state);
        localStorage.removeItem('cart'); 
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
        state.error=action.payload; 
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
export const { clearCartLocal, removeFromCart, updateQuantity } = cartSlice.actions;   
export default cartSlice.reducer;