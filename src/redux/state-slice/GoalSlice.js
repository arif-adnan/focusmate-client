import { createSlice } from "@reduxjs/toolkit";
export const goalSlice=createSlice({
    name:'goal',
    initialState:{
        New:[],
        Completed:[],
        Progress:[],
        Cancelled:[]
    },
    reducers:{
        SetNewGoal:(state,action)=>{
            state.New=action.payload
        },
        SetCompletedGoal:(state,action)=>{
            state.Completed=action.payload
        },
        SetProgressGoal:(state,action)=>{
            state.Progress=action.payload
        },
        SetCancelledGoal:(state,action)=>{
            state.Cancelled=action.payload
        }

    }
})
export  const {SetNewGoal,SetCompletedGoal,SetProgressGoal,SetCancelledGoal}=goalSlice.actions;
export default  goalSlice.reducer;
