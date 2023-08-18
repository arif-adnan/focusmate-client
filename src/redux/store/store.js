import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../state-slice/GoalSlice";
import profileReducer from "../state-slice/ProfileSlice";
import settingsReducer from "../state-slice/SettingsSlice";
import summaryReducer from "../state-slice/SummarySlice";

export default configureStore({
    reducer:{
        settings:settingsReducer,
        goal:goalReducer,
        summary:summaryReducer,
        profile:profileReducer
    }
})