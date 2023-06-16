import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../Firebase/user.services";
import { User } from "../Types/type";

const initialState: User = {
  currentUser: {
    name: "",
    email: "",
    profile: "",
    password: "",
    phone: "",
    hasCompletedProfile: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetData: (state) => {
      state.currentUser.hasCompletedProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      console.log("loading ....");
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as any;
    });
  },
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string | null) => {
    if (userId) {
      const userData = await userServices.getUser(userId);
      return userData.data();
    }
  }
);

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
