import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const sendNotification = createAsyncThunk("sendNotification", async (payload) => {
    try {
        const token=localStorage.getItem("bearerToken");


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        console.log(payload,"payload is 1111111111111")
        const response = await axios.post("http://localhost:3000/admin/multiple/sendNotification",payload,config);
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in sending notification");
        return error;
    }
})


export const notification = createSlice({
    name: "notification",
    initialState: {
        notificationArr: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [sendNotification.pending]: (state, action) => {
            state.loading = true
        },
        [sendNotification.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled",action.payload)
            state.notificationArr = action.payload
        },
        [sendNotification.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default notification.reducer;