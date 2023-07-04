import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";


import axios from "axios";
// get all docs data api call
export const getDocsData = createAsyncThunk("getDocsData", async (payload) => {
    try {
        
        
        const token=localStorage.getItem("bearerToken");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        console.log(payload,"payload is 1111111111111")
        const response = await axios.post("http://localhost:3000/admin/addAppData",payload,config);
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all Docs data");
        return error;
    }
})


export const docsDetails = createSlice({
    name: "docsDetails",
    initialState: {
        docs: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getDocsData.pending]: (state, action) => {
            state.loading = true
        },
        [getDocsData.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled",action.payload)
            state.docs = action.payload
        },
        [getDocsData.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default docsDetails.reducer;