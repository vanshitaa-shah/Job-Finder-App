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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.currentUser!.role = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
