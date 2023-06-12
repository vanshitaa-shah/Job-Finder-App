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
    loading: loadingReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
