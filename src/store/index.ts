import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./jobSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // job: jobReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
