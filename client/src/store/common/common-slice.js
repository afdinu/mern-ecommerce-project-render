import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading:false,
    featureImages:[]
}
export const addFeatureImage = createAsyncThunk("/addFeatureImage",
    async(image)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/add`,{image})
        return response.data
    }
)
export const getFeatureImages = createAsyncThunk("/getFeatureImages",
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/get`)
        return response.data;
    }
)

const commonSlice = createSlice({
    name:"commonSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getFeatureImages.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getFeatureImages.fulfilled,(state,action)=>{
            state.isLoading=false
            state.featureImages = action?.payload?.data
        })
        .addCase(getFeatureImages.rejected,(state)=>{
            state.isLoading=false
            state.featureImages = []
        })
    }
})

export default commonSlice.reducer