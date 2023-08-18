import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../state-slice/ProfileSlice";
import settingsReducer from "../state-slice/SettingsSlice";
import summaryReducer from "../state-slice/SummarySlice";
import taskReducer from "../state-slice/TaskSlice";

export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summary:summaryReducer,
        profile:profileReducer
    }
})