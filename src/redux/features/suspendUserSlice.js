import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";

// this action is to suspend the user
export const suspendUser = createAsyncThunk("suspendUser", async (payload) => {
    try {
        const token=localStorage.getItem("bearerToken");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const response = await axios.post("http://localhost:3000/admin/user/suspendOrNot", payload, config);
        const result = await response.data;
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all suspended user");
        return error;
    }
})


export const suspensionDetails = createSlice({
    name: "suspensionDetails",
    initialState: {

        suspensionResponse: [],
        loading: false,
        error: null
    },
    extraReducers: {

        [suspendUser.pending]: (state, action) => {
            state.loading = true
        },
        [suspendUser.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled", action.payload)
            state.suspensionResponse = action.payload
        },
        [suspendUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default suspensionDetails.reducer;