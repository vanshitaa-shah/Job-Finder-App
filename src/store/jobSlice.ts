import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jobServices from "../Firebase/job.services";

export interface Job {
  id: string;
  providerEmail: string;
  jobTitle: string;
  jobType: "Intern" | "Fresher" | "Experienced";
  jobDescription: string;
  requirements: string[];
  salary: number;
  applicants?: string[];
}

const initialState: { jobs: Array<Job> } = { jobs: [] };
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobs = action.payload;
      console.log(state.jobs);
    });
  },
});

export const fetchJobsByEmail = createAsyncThunk(
  "job/fetchJobs",
  async (email: string | null) => {
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
        };
        userJobs.push(jobData);
      }
    });
    return userJobs;
  }
);
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
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
    };
    userJobs.push(jobData);
  });
  return userJobs;
});

export const jobReducer = jobSlice.reducer;
export const jobActions = jobSlice.actions;
