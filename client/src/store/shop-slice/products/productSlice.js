import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    productsList:[],
    productDetails:null,
}

export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchAllFilteredProducts",
    async({filterParams,sortParams})=>{
        const query = new URLSearchParams({
            ...filterParams,
            sortBy:sortParams
        })
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`)
        // console.log(response.data)
        return response.data

})
export const fetchProductDetails = createAsyncThunk("/products/fetchProductDetails",
    async(id)=>{
      
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`)
        // console.log(response.data)
        return response.data

})

const shoppingProductSlice = createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{
        setProductDetails :(state)=>{
            state.productDetails = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.isLoading = false;
            state.productsList = action.payload.data;
        
        })
        .addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
          
            state.isLoading = false;
            state.productsList = [];
     
        })
        .addCase(fetchProductDetails.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            // console.log(action.payload)
            state.isLoading = false;
            state.productDetails = action.payload.data;
        
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
          
            state.isLoading = false;
            state.productDetails = [];
     
        })

    }
})
export const{setProductDetails} =shoppingProductSlice.actions
export default shoppingProductSlice.reducer;