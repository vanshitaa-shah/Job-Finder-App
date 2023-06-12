import { createSlice } from "@reduxjs/toolkit";
import { JobProvider, JobSeeker, User } from "../Types/type";

const initialState: User = {
  currentUser: {
    email: "",
    profile: "",
    password: "",
    phone: "",
  },
};
type UserActionType = {
  payload: JobSeeker | JobProvider;
};
const userSlice = createSlice({
  name: "seeker",
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.currentUser!.role = action.payload;
    },
    createNewUser: (state, action: UserActionType) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    completeProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
