import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:Boolean(localStorage.getItem("isAuthenticated"))||false,
    hasCompletedProfile:Boolean(localStorage.getItem("hasCompletedProfile"))||false,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        authentication:(state)=>{
            state.isAuthenticated=true;
            localStorage.setItem("isAuthenticated","true");
        },
        profileCompletion:(state)=>{
            state.hasCompletedProfile=true;
            localStorage.setItem("hasCompletedProfile","true");
        },
        resetAuthInfo:(state)=>{
            state.isAuthenticated=false;
            state.hasCompletedProfile=false;
            localStorage.clear()
        }
    }
})