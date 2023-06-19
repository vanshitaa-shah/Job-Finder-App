import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "../Firebase/user.services";
import { User, UserSliceType } from "../Types/type";
import { setLoading } from "./loadingSlice";

const initialState: UserSliceType = {
  users:[],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetData: (state) => {
      if(state.currentUser)
      state.currentUser.hasCompletedProfile = false;
    },
    updateData: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      console.log("loading ....");
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as any;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;     
    });
  },
});

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string | null,{dispatch}) => {
    if (userId) {
      dispatch(setLoading(true));
      const userData = await userServices.getUser(userId);
      dispatch(setLoading(false))
      return userData.data();
    }
  }
);
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_,{dispatch}) => {
      dispatch(setLoading(true));
      const users:User[]=[]
      const userDocs = (await userServices.getUsers()).docs;
      userDocs.map((user)=>users.push(user.data() as User))
      dispatch(setLoading(false))
      return users;
    }
);

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
