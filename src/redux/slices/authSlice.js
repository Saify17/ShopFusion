import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/axios"

export const signUp = createAsyncThunk("auth/signUp", 
    async({username, email, password}, {rejectWithValue})=>{
    try{
        const response = await api.post("/users/add", { username, email, password });
        return response.data;
    }catch(error){
        return rejectWithValue(error.response?.data?.message || "Invalid credentials");
    }
});

export const login = createAsyncThunk("auth/login",
    async({username, password}, {rejectWithValue})=>{
        const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
        const userByName = localUsers.find(user => user.username === username);
        if(userByName){
            if(userByName.password !== password){
                return rejectWithValue("Wrong password, please try again");
            }
            return {
                ...userByName,
                id: userByName.id || Date.now(),
                token: "fake-token-custom-"+userByName.id,
                accessToken: "fake-access-token-custom-"+userByName.id,
            };
        }
        try{
            const response = await api.post("/auth/login", { username, password });
            const full = await api.get(`/users/${response.data.id}`);   // this one has the role
            return { ...response.data, role: full.data.role };
        }catch(error){
            return rejectWithValue("Account not found, please signup first");
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null, 
    token: localStorage.getItem("token") || null, 
    loading: false,
    error: null, 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout: (state) => { 
            state.user=null; 
            state.token=null; 
            localStorage.removeItem("user"); 
            localStorage.removeItem("token"); },
    },
    extraReducers: (builder)=>{
        builder.addCase(signUp.pending, (state)=>{
            state.loading= true;
            state.error = false;
        });
        builder.addCase(signUp.fulfilled, (state,action)=>{
            state.loading=false;
            const original = action.meta.arg;
            const newLocalUsers = { 
                id: Date.now(), 
                username: original.username, 
                email: original.email, 
                password: original.password 
            };
            const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
            if(!localUsers.find(u=>u.username===newLocalUsers.username)){ 
                localUsers.push(newLocalUsers); 
            }
            localStorage.setItem("localUsers", JSON.stringify(localUsers));
        });
        builder.addCase(signUp.rejected, (state,action)=>{
            state.loading=false;
            state.error = action.payload;
        });
        builder.addCase(login.pending, (state)=>{
            state.loading= true;
            state.error = false;
        });
        builder.addCase(login.fulfilled, (state,action)=>{
            state.loading=false;
            state.user = action.payload;
            state.token = action.payload.accessToken || action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("token", action.payload.accessToken || action.payload.token);
        });
        builder.addCase(login.rejected, (state,action)=>{
            state.loading=false;
            state.error = action.payload;
        });
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer