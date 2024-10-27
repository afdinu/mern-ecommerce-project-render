import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
}

export const addNewProduct = createAsyncThunk("/products/addNewProduct",
    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response?.data

    }
)
export const fetchAllProducts = createAsyncThunk("/products/fetchAllProduct",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
        return response?.data

    }
)
export const editProduct = createAsyncThunk("/products/editProduct",
    async ({id,formData}) => {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData,
             {
            headers: {
                "Content-Type": "application/json"
            }}
        );
        return response?.data

    }
)
export const deleteProduct = createAsyncThunk("/products/deleteProduct",
    async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
        return response?.data

    }
)


const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false;
            state.productsList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.productsList = [];
        })

    }
})
export default adminProductSlice.reducer