import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./jobSlice";
import { userReducer } from "./userSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    job: jobReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
