import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const getUser = createAsyncThunk("getUser", async (payload) => {
    try {
        const token=localStorage.getItem("bearerToken");


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        console.log(payload, "payload is 1111111111111")
        const response = await axios.post("http://localhost:3000/admin/getallusers", payload, config);
        console.log(response)

        const result = await response.data

        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all users");
        return error;
    }
})




export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
       
        loading: false,
        error: null
    },
    extraReducers: {
        [getUser.pending]: (state, action) => {
            state.loading = true
        },
        [getUser.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled", action.payload)
            state.users = action.payload
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

    }
});

export default userDetail.reducer;