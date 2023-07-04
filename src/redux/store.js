import { configureStore } from "@reduxjs/toolkit";
import userDetail from "./features/userDataSlice";
import liveVideoCallsUsers from "./features/videoCallUsersSlice";
import liveStreamingUsers from "./features/liveStreamingUsersSlice";
import docsDetails from "./features/documentationSlice";
import notification from "./features/notificationSlice";
import levelDetails from "./features/levelsSlice";
import reportedUsersDetails from "./features/reportedUsersSlice";
import suspensionDetails from "./features/suspendUserSlice";
const store = configureStore({
    reducer: {
        usersDataReducer: userDetail,
        videoCallUsersReducer: liveVideoCallsUsers,
        liveStreamingUsersReducer: liveStreamingUsers,
        docsReducer: docsDetails,
        notificationReducer: notification,
        levelDataReducer: levelDetails,
        reportedUsersReducer: reportedUsersDetails,
        suspendReducer:suspensionDetails
    }
})


export default store;