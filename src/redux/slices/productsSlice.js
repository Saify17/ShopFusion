// src/redux/slices/productsSlice.js - FIXED with category support
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// fetching Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 12, skip = 0 , sortBy = "", order = "asc" }, { rejectWithValue }) => {
    try {
      const sortQuery = sortBy ? `&sortBy=${sortBy}&order=${order}` : ""; 
      const response = await api.get(`/products?limit=${limit}&skip=${skip}${sortQuery}`); // was no ${sortQuery}
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// NEW - Added for Footer categories to work - Line 17
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      
      const response = await api.get(`/products/category/${category}`);
      console.log(`Category ${category} API result:`, response.data.products.length, "products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  
  export const fetchCategoryList = createAsyncThunk(
  "products/fetchCategoryList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/category-list`);
      return response.data; // plain array: ["beauty","fragrances","furniture", ...]
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  this thunk for admin panel 
const getAdminProducts = () => JSON.parse(localStorage.getItem("ADMIN_PRODUCTS") || "[]"); 
const saveAdminProducts = (arr) => localStorage.setItem("ADMIN_PRODUCTS", JSON.stringify(arr));

// Admin add product

export const addProduct = createAsyncThunk(
  // 
  "products/addProduct",
  async (newProduct, { rejectWithValue }) => {

    try {
      const response = await api.post(`/products/add`, newProduct);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// NEW — Admin: delete 
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/products/${id}`);

      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

 /// Admin update thunk
 export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, data);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// locally update thunk



// fetching Search products
export const searchProducts = createAsyncThunk("products/searchProducts",  async(searchTerm, {rejectWithValue})=>{
    try {
      const response = await api.get(`/products/search?q=${searchTerm}`);
      return response.data;
    } catch(e) {
      return rejectWithValue(e.message)
    }
})

// fetching single Product
export const fetchingSingleProduct = createAsyncThunk("products/fetchSingleProduct", async (id, {rejectWithValue})=>{
      const local = JSON.parse(localStorage.getItem("ADMIN_PRODUCTS") || "[]")
        .find((p) => String(p.id) === String(id));
      if (local) return local;              
      try {
        const response = await api.get(`/products/${id}`);
        return response.data;
      } catch (e) { return rejectWithValue(e.message); }
})

const initialState = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 20,
  categories: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSkip: (state, action) => {
      state.skip = action.payload;
    },
      removeAdminProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveAdminProducts(getAdminProducts().filter((p) => p.id !== action.payload));
    },
    updateAdminProduct: (state, action) => {
      const { id, data } = action.payload;
      state.products = state.products.map((p) =>
        p.id === id ? { ...p, ...data, isAdminAdded: true } : p
      );
      saveAdminProducts(
        getAdminProducts().map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    },
  },
  extraReducers: (builder) => {

    // builder cases for fetch products 
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
       const adminProducts = getAdminProducts();
       state.products = [...adminProducts, ...action.payload.products];
      
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products; 
      state.total = action.payload.total;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // builder cases for Search products 
    builder.addCase(searchProducts.pending, (state)=>{
      state.loading=true;
    });
    builder.addCase(searchProducts.fulfilled, (state,action)=>{
      state.loading=false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(searchProducts.rejected, (state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })

    // builder cases for Single Product fetching
    builder.addCase(fetchingSingleProduct.pending, (state)=>{
      state.loading=true;
      state.error=null;
    }) ;
    builder.addCase(fetchingSingleProduct.fulfilled, (state,action)=>{
      state.loading=false;
      state.singleProduct=action.payload;
    });
    builder.addCase(fetchingSingleProduct.rejected, (state,action)=>{
      state.loading=false;
      state.singleProduct = null;
      state.error=action.payload;
    });



    builder.addCase(fetchCategoryList.fulfilled, (state, action) => {
      state.categories = action.payload;
    });



        // Builder cases for the admin panel 

        builder.addCase(addProduct.fulfilled, (state, action) => {
        const newItem = { ...action.payload, id: Date.now(), isAdminAdded: true };
        state.products = [newItem, ...state.products]; 
        saveAdminProducts([newItem, ...getAdminProducts()]); 
      });

      // NEW — what happens the MOMENT deleteProduct succeeds
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload.id);
        // .filter() builds a NEW array keeping only items where the condition is true
        // "p.id !== action.payload.id" = "keep everything EXCEPT the one that matches"
        saveAdminProducts(getAdminProducts().filter((p) => p.id !== action.payload.id)); // same idea, applied to the saved localStorage copy
      });

      builder.addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ); 
      });


  },
});

export const { setSkip, removeAdminProduct, updateAdminProduct } = productsSlice.actions;
export default productsSlice.reducer;
