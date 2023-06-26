import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: "",
  role: localStorage.getItem("role") || "",
  isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")) || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },

    addRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    authentication: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },

    resetAuthInfo: (state) => {
      state.id = "";
      state.role = "";
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
