import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { projectAuth } from "src/firebase/firebase";

import axios from "axios";
// get all user data api call
export const getReportedUsers = createAsyncThunk("getReportedUsers", async () => {
    try {
        const token=localStorage.getItem("bearerToken");


        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        console.log(config)
        
        const response = await axios.get("http://localhost:3000/admin/getAllReportedUsers",config);
        console.log("all the reported users data")
        console.log(response)

        const result = await response.data
        
        return result;
    } catch (error) {
        console.log(error)
        console.log("error in fetcing get all reported users");
        return error;
    }
})


export const reportedUsersDetails = createSlice({
    name: "reportedUsersDetails",
    initialState: {
        reportedUsersData: [],
        loading: false,
        error: null
    },
    extraReducers: {
        [getReportedUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getReportedUsers.fulfilled]: (state, action) => {
            state.loading = false
            console.log("fullfiled",action.payload)
            state.reportedUsersData = action.payload
        },
        [getReportedUsers.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
});

export default reportedUsersDetails.reducer;