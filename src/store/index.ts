import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./jobSlice";
import { userReducer } from "./userSlice";
import authReducer from "./authSlice";
import { loadingReducer } from "./loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    job: jobReducer,
    loading: loadingReducer,
  },
});

// Export types of state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
