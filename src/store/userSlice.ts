import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../Firebase/user.services";
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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as any;
    });
  },
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const userData = await userServices.getUser(userId);
    return userData.data();
  }
);

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
