import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../Firebase/user.services";
import { EditValues, User, UserSliceType } from "../Types/types";
import { setLoading } from "./loadingSlice";

const initialState: UserSliceType = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetData: (state) => {
      if (state.currentUser) state.currentUser.hasCompletedProfile = false;
    },
    updateData: (state, action: PayloadAction<EditValues>) => {
      const updatedData = { ...state.currentUser, ...action.payload };
      state.currentUser = updatedData as User;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as User;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

// Thunk for fetching user by unique ID
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string | null, { dispatch }) => {
    if (userId) {
      dispatch(setLoading(true));
      const userData = await userServices.getUser(userId);
      dispatch(setLoading(false));
      return userData.data() as User;
    }
  }
);

// Thunk for fetching All Users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const users: User[] = [];
    const userDocs = (await userServices.getUsers()).docs;
    userDocs.map((user) => users.push(user.data() as User));
    dispatch(setLoading(false));
    return users;
  }
);

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
