import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const getAllLivestreamUsers = createAsyncThunk("getAllLivestreamUsers", async () => {
    try {
        const token=localStorage.getItem("bearerToken");


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        const response = await axios.get("http://localhost:3000/admin/current/users/livestreaming",config);
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all live streaming call users");
        return error;
    }
})


export const liveStreamingUsers = createSlice({
    name: "liveStreamingUsers",
    initialState: {
        livestreaingUsersArr: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getAllLivestreamUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getAllLivestreamUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.livestreaingUsersArr = action.payload
        },
        [getAllLivestreamUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default liveStreamingUsers.reducer;