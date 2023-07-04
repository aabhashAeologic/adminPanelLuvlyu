import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const getLevels = createAsyncThunk("getLevels", async () => {
    try {
        
        
        const token=localStorage.getItem("bearerToken");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
       
        const response = await axios.get("http://localhost:3000/admin/levels",config);
        console.log("levels response")
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all levels");
        return error;
    }
})


export const levelDetails = createSlice({
    name: "levelDetails",
    initialState: {
        levels: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getLevels.pending]: (state, action) => {
            state.loading = true
        },
        [getLevels.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled",action.payload)
            state.levels = action.payload
        },
        [getLevels.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default levelDetails.reducer;