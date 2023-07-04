import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const getAllVideoCallUsers = createAsyncThunk("getAllVideoCallUsers", async () => {
    try {
        const token=localStorage.getItem("bearerToken");


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        const response = await axios.get("http://localhost:3000/admin/current/users/videocall",config);
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all live video call users");
        return error;
    }
})


export const liveVideoCallsUsers = createSlice({
    name: "liveVideoCallsUsers",
    initialState: {
        liveVideoCallUsersArr: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getAllVideoCallUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getAllVideoCallUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.liveVideoCallUsersArr = action.payload
        },
        [getAllVideoCallUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default liveVideoCallsUsers.reducer;