import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")) || false,
  hasCompletedProfile:
    Boolean(localStorage.getItem("hasCompletedProfile")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    authentication: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    profileCompletion: (state) => {
      state.hasCompletedProfile = true;
      localStorage.setItem("hasCompletedProfile", "true");
    },
    resetAuthInfo: (state) => {
      state.id = "";
      state.isAuthenticated = false;
      state.hasCompletedProfile = false;
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
