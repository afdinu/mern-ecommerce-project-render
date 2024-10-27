import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading:false,
    reviews:[]
}
export const addReview = createAsyncThunk("/addProductReview",
    async(data)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`,data)

            return response.data
    }
)
export const getReviews = createAsyncThunk("/getProductReviews",
    async(productId)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`)
         return response.data
    }
)

const reviewSlice = createSlice({
    name:"reviewProductSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getReviews.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getReviews.fulfilled,(state,action)=>{
            state.isLoading=false
            state.reviews = action?.payload?.data
        })
        .addCase(getReviews.rejected,(state)=>{
            state.isLoading=false
            state.reviews = []
        })
    }
})

export default reviewSlice.reducer