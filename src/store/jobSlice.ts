import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobServices from "../Firebase/job.services";
import { Job } from "../Types/types";
import { setLoading } from "./loadingSlice";

const initialState: { jobs: Array<Job> } = { jobs: [] };
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateJobs: (state, action:PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
    });
  },
});

// Thunk for fetching Jobs of specific provider
export const fetchJobsByEmail = createAsyncThunk(
  "job/fetchJobs",
  async (email: string | null, { dispatch }) => {
    dispatch(setLoading(true));
    const jobs = (await jobServices.getJobs()).docs;
    const userJobs: Job[] = [];
    jobs.filter((job) => {
      if (job.data().providerEmail == email) {
        const jobData: Job = {
          id: job.id,
          providerEmail: job.data().providerEmail,
          jobTitle: job.data().jobTitle,
          jobType: job.data().jobType,
          jobDescription: job.data().jobDescription,
          requirements: job.data().requirements,
          salary: job.data().salary,
          applicants: job.data().applicants || [],
        };
        userJobs.push(jobData);
      }
    });
    dispatch(setLoading(false));
    return userJobs;
  }
);

// Thunk for fetching All the Jobs
export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const jobs = (await jobServices.getJobs()).docs;
    const userJobs: Job[] = [];
    jobs.filter((job) => {
      const jobData: Job = {
        id: job.id,
        providerEmail: job.data().providerEmail,
        jobTitle: job.data().jobTitle,
        jobType: job.data().jobType,
        jobDescription: job.data().jobDescription,
        requirements: job.data().requirements,
        salary: job.data().salary,
        applicants: job.data().applicants,
      };
      userJobs.push(jobData);
    });
    dispatch(setLoading(false));
    return userJobs;
  }
);

export const jobReducer = jobSlice.reducer;
export const jobActions = jobSlice.actions;
